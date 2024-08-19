import React, { useState, useRef } from 'react';
import adapter from 'webrtc-adapter'; // Importez webrtc-adapter
import Janus from 'janus-gateway';

window.adapter = adapter; // Définir l'adaptateur globalement

function TestJanus() {
    const [janusInitialized, setJanusInitialized] = useState(false);
    const [username, setUsername] = useState('');
    const [inMeeting, setInMeeting] = useState(false);
    const [participants, setParticipants] = useState([]);

    const janusRef = useRef(null);
    const pluginHandleRef = useRef(null);

    const audioEnabled = useRef(true)
    const roomSuspend = useRef(true)

    const [webrtcUp, setWebrtcUp] = useState(false);
    const [myId, setMyId] = useState(null);

    // const [audioEnabled, setAudioEnabled] = useState(true);
  
    // Fonction pour initialiser Janus
    const initializeJanus = () => {
      Janus.init({
        debug: "all",
        callback: () => {
          janusRef.current = new Janus({
            server: 'http://localhost:8088/janus', // Remplace par l'URL de ton serveur Janus
            success: () => {
              setJanusInitialized(true);
            },
            error: (error) => {
              console.error("Erreur d'initialisation de Janus :", error);
            },
          });
        },
      });
    };
  
    // Fonction pour rejoindre la réunion
    const joinMeeting = () => {
      if (!janusInitialized || !username) return;
  
      janusRef.current.attach({
        plugin: "janus.plugin.audiobridge",
        success: (pluginHandle) => {
          pluginHandleRef.current = pluginHandle;
  
          const register = { request: "join", room: 1234, display: username };
          pluginHandleRef.current.send({ message: register });
  
          setInMeeting(true);
        },
        error: (error) => {
          console.error("Erreur d'attachement :", error);
        },
        onmessage: (msg, jsep) => {
          const event = msg["audiobridge"];
          if (event === "joined") {
            // new line
            if (msg['id']) {
              setMyId(msg['id']);
              if (!webrtcUp) {
                setWebrtcUp(true);
                pluginHandleRef.current.createOffer({
                  media: { audio: true, video: false, data: false },
                  success: (jsep) => {
                    let publish = { request: 'configure', muted: false };
                    pluginHandleRef.current.send({ message: publish, jsep: jsep });
                  },
                  error: (error) => {
                    console.error('WebRTC error:', error);
                  }
                });
              }
            }
            const newParticipants = msg["participants"];
            if (newParticipants) {
              // Ajouter uniquement les participants qui ne sont pas déjà dans la liste
              setParticipants((prevParticipants) => {
                const updatedParticipants = [...prevParticipants];
                newParticipants.forEach((participant) => {
                  if (!updatedParticipants.some((p) => p.id === participant.id)) {
                    updatedParticipants.push(participant);
                  }
                });
                return updatedParticipants;
              });
            }
          } else if (event === "event") {
            const newParticipants = msg["participants"];
            if (newParticipants) {
              // Ajouter uniquement les participants qui ne sont pas déjà dans la liste
              setParticipants((prevParticipants) => {
                const updatedParticipants = [...prevParticipants];
                newParticipants.forEach((participant) => {
                  if (!updatedParticipants.some((p) => p.id === participant.id)) {
                    updatedParticipants.push(participant);
                  }
                });
                return updatedParticipants;
              });
            } else{
                const leaving = msg["leaving"]
                setParticipants((prevParticipants) =>
                    prevParticipants.filter((participant) => participant.id !== leaving)
                );
            }
          }else if (event === 'destroyed') {
            console.warn('The room has been destroyed!');
            window.location.reload();
          }
          // Si jsep est présent, il faut le gérer
          if (jsep) {
            pluginHandleRef.current.handleRemoteJsep({ jsep });
          }
        },
        onlocaltrack: (track, on) => {
          console.debug('Local track', on ? 'added' : 'removed', ':', track);
          if (on) {
            console.log('on local track on !!');
            
          }
        },
        onremotetrack: (track, mid, on) => {
          if (track.kind === 'audio') {
            if (on) {
              const romoteStreamConst = new MediaStream([track])
              if (document.getElementById('roomaudio') === null) {
                document.getElementById('mixedaudio').innerHTML = '<audio id="roomaudio" controls autoplay/>';
              }
              Janus.attachMediaStream(document.getElementById('roomaudio'), romoteStreamConst);
            } else {
              document.getElementById('roomaudio')?.remove();
            }
          }
        },  
        oncleanup: () => {
          setWebrtcUp(false);
        },
        destroyed: () => {
          window.location.reload();
          console.log('Janus session destroyed');
        }
      });                
    };
    
  // console.log(participants);
  // se suspendre de la reunion
  const toggleSuspend = () => {
    roomSuspend.current = !roomSuspend.current
    pluginHandleRef.current.send({ message: { request: roomSuspend.current ? 'resume' : 'suspend', room: 1234, id: myId } });
  };
  // Activer/Désactiver le microphone
  const toggleAudio = () => {
    audioEnabled.current = !audioEnabled.current
    pluginHandleRef.current.send({ message: { request: 'configure', muted: !audioEnabled.current }});
  };

  const leaveMeeting = () => {
      if (janusRef.current) {
          janusRef.current.destroy()
          setJanusInitialized(false);
          setInMeeting(false);
          setParticipants([]);
          janusRef.current = null;  // Assurez-vous de nettoyer la référence
        }else {
          console.error("Erreur lors de la destruction de la session Janus :");
        }
    };
  
    return (
      <div>
        <h2>Janus Audioconférenced</h2>
        {!janusInitialized ? (
          <button onClick={initializeJanus}>Démarrer</button>
        ) : !inMeeting ? (
          <div>
            <input
              type="text"
              placeholder="Entrez votre nom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={joinMeeting}>Joindre la réunion</button>
          </div>
        ) : (
          <div>
            <h3>Participants</h3>
            <ul>
              {participants.map((participant) => (
                <li key={participant.id}>{participant.display}</li>
              ))}
            </ul>
            <button onClick={toggleAudio}>
              {audioEnabled.current ? "Désactiver le Microphone" : "Activer le Microphone"}
            </button>
            <div className="card-body" id="mixedaudio"></div>
            <button onClick={leaveMeeting}>Quitter la réunion</button>
          </div>
        )}
      </div>
    );
  }
  

export default TestJanus;
