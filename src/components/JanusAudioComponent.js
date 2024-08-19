import React, { useRef, useState } from 'react';
import adapter from 'webrtc-adapter'; // Importez webrtc-adapter
import Janus from 'janus-gateway';

window.adapter = adapter; // Définir l'adaptateur globalement

const JanusAudioComponent = () => {
  const [janus, setJanus] = useState(null);
  const [pluginHandle, setPluginHandle] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [userName, setUserName] = useState('');
  const [inConference, setInConference] = useState(false);
  const [created, setCreated] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);

  var myPlug = null

  const initJanus = (roomAction) => {
    Janus.init({
      debug: 'all',
      callback: () => {
        const janusInstance = new Janus({
          server: 'http://localhost:8088/janus', // URL de votre serveur Janus
          success: () => {
            janusInstance.attach({
              plugin: 'janus.plugin.audiobridge',
              success: (handle) => {
                setPluginHandle(handle);
                myPlug = handle
                console.log('plufin test', myPlug);
                
                if (roomAction === 'create') {
                  // createRoom(handle);
                  setCreated(true);
                  setRoomId(1234)
                } else if (roomAction === 'join') {
                  // setInConference(true);
                  console.log("join test");
                }
              },
              error: (error) => {
                console.error('Erreur lors de l\'attachement du plugin:', error);
              },
              onmessage: (msg, jsep) => {
                console.log('Message:', msg);
                console.log('plufin test on message', myPlug);

                // Vérifier si participants est bien un tableau avant de l'utiliser
                if (Array.isArray(msg.participants)) {
                  setListUsers(msg.participants);
                } else {
                  console.error("Les participants ne sont pas un tableau :", msg.participants);
                }
                console.log(listUsers);
                if (jsep !== undefined && jsep !== null) {
                  myPlug.handleRemoteJsep({ jsep });
                }
                handleMessage(msg, jsep, myPlug);
              },
              onlocalstream: (stream) => {
                // if (localAudioRef.current) {
                //   localAudioRef.current.srcObject = stream;
                // }
                Janus.attachMediaStream(localAudioRef.current, stream);
              },
              onremotestream: (stream) => {
                // if (remoteAudioRef.current) {
                //   remoteAudioRef.current.srcObject = stream;
                // }
                Janus.attachMediaStream(remoteAudioRef.current, stream);
              },
              oncleanup: () => {
                console.log('Nettoyage du plugin');
              },
            });
          },
          error: (error) => {
            console.error('Erreur lors de l\'initialisation de Janus:', error);
          },
          destroyed: () => {
            console.log('Session Janus détruite');
          },
        });

        setJanus(janusInstance);
      },
    });
  };

  // const createRoom = (handle) => {
  //   const create = {
  //     request: 'create',
  //     room: Math.floor(Math.random() * 10000), // ID de salle aléatoire
  //     description: 'Nouvelle réunion',
  //     sampling_rate: 16000,
  //     bitrate: 64000,
  //     publishers: 20,
  //   };
  //   handle.send({
  //     message: create,
  //     success: (response) => {
  //       setRoomId(response.room);
  //       setCreated(true);
  //       console.log(response.room, "id room request");
  //       console.log(roomId, "id room state");
  //       // setInConference(true);
  //     },
  //   });
  // };

  // const joinRoom = () => {
  //   if (pluginHandle && roomId && userName) {
  //     const register = {
  //       request: 'join',
  //       room: roomId,
  //       ptype: 'publisher',
  //       display: userName,
  //     };
  //     pluginHandle.send({ message: register });
  //     setInConference(true);
  //     console.log(roomId);
  //   }
  // };

  const joinRoom = () => {
    console.log(janus, "this is janus");
    if (pluginHandle && roomId && userName) {
      const register = {
        request: 'join',
        room: 1234,
        // room: roomId,
        ptype: 'publisher',
        display: userName,
      };
  
      console.log("Tentative de rejoindre la réunion avec les paramètres :", register);
  
      pluginHandle.send({
        message: register,
        success: (response) => {
          console.log("Réponse après avoir tenté de rejoindre la réunion :", response);
          if (response && response.jsep) {
            // Handle any JSEP if returned
            pluginHandle.handleRemoteJsep({ jsep: response.jsep });
          }
          setInConference(true);
        },
        error: (error) => {
          console.error("Erreur lors de la tentative de rejoindre la réunion :", error);
        },
      });
    } else {
      console.warn("Paramètres manquants pour rejoindre la réunion : pluginHandle, roomId ou userName : ", roomId, pluginHandle, userName);
    }
  };

  // const toggleMute = () => {
  //   if (pluginHandle) {
  //     console.log(pluginHandle, 'test muted');
  //     const muted = pluginHandle.isAudioMuted();
  //     pluginHandle[muted ? 'unmuteAudio' : 'muteAudio']();
  //   }
  // };

  // useEffect(() => {
  //   // Initialisation de pluginHandle
  //   if (!pluginHandle) {
  //     console.error("pluginHandle n'est pas encore initialisé.");
  //     return;
  //   }
  
  //   console.log("pluginHandle a été initialisé :", pluginHandle);
  // }, [pluginHandle]);

  // console.log("pluginHandle juste avant toggleMute:", pluginHandle);

  const toggleMute = () => {
    try {
      const muted = pluginHandle.isAudioMuted();
      if (muted) {
        pluginHandle.unmuteAudio();
        console.log("audio muted");

      } else {
        pluginHandle.muteAudio();
        console.log("audio demuted");
        
      }
      console.log("Microphone est maintenant", muted ? "démuté" : "muté");
    } catch (error) {
      console.error("Erreur lors de la modification de l'état du micro :", error);
    }
  };
  

  const renderParticipants = (list) => {
    // const participantsArray = Array.isArray(listUsers) ? listUsers : [];
    return list.map((participant) => (
      <div key={participant.id} className="participant">
        <p><span>{participant.id}</span> : {participant.display}, {participant.muted === true ? "micro ouvert" : "micro fermé"}</p>
      </div>
    ));
  };

  // const handleMessage = (msg, jsep, plug) => {
  //   if(plug) {
  //     if (jsep) {
  //       plug.handleRemoteJsep({ jsep: jsep });
  //     }
  
  //     const event = msg.audiobridge;
  //     if (event) {
  //       if (event === "joined") {
  //         console.log("Rejoint la réunion:", msg);
  //         publishOwnAudio(plug);
  //       }
  //     }
  //   } else {
  //     console.error("Le plugin est null lors de l'envoies du message"); 
  //   }
  // };

  const reorderMlines = (offerSdp, answerSdp) => {
    const offerMlines = offerSdp.match(/^m=.*$/gm);
    const answerMlines = answerSdp.match(/^m=.*$/gm);

    if (offerMlines && answerMlines && offerMlines.length === answerMlines.length) {
        const reorderedAnswerSdp = offerMlines.map((offerMline, index) => {
            return answerMlines[index];
        }).join('\r\n');

        return answerSdp.replace(/^m=.*$/gm, reorderedAnswerSdp);
    }

    return answerSdp;
};

  const handleMessage = (msg, jsep, plug) => {
    if (plug) {
        if (jsep) {
            const reorderedJsep = { ...jsep };
            reorderedJsep.sdp = reorderMlines(plug.webrtcStuff.pc.localDescription.sdp, jsep.sdp);
            plug.handleRemoteJsep({ jsep: reorderedJsep });
        }

        const event = msg.audiobridge;
        if (event) {
            if (event === "joined") {
                console.log("Rejoint la réunion:", msg);
                publishOwnAudio(plug);
            }
        }
    } else {
        console.error("Le plugin est null lors de l'envoi du message");
    }
};


  const publishOwnAudio = (plug) => {
    if (plug){
      plug.createOffer({
        media: { video: false, audio: true }, // On publie uniquement l'audio
        success: (jsep) => {
          const publish = { request: "configure", muted: false };
          plug.send({ message: publish, jsep: jsep });
          console.log("audio envoyé");
        },
        error: (error) => {
          console.error("Erreur WebRTC:", error);
        },
      });
    } else {
      console.error("pluginHandle est null lors de la publication de l'audio.");
    }
  };

  return (
    <div>
      {!inConference ? (
        <div>
          {created === false ? <button className='bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={() => initJanus('create')}>Créer une nouvelle réunion</button> : null}
          {/* <button className='bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={() => initJanus('join')}>Rejoindre une réunion</button> */}
          {roomId && (
            <>
              <input
                type="text"
                placeholder="Entrez votre nom"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
              <button className='bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={joinRoom}>Commencer la réunion</button>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2 className='text-center p-2'>Réunion en cours...</h2>
          <h2 className='text-center p-2 text-blue-500'>C'est moi : {userName}</h2>
          <h2 className='text-center p-2 text-blue-500'>
            Autres utilisateurs : <br />
            {Array.isArray(listUsers) ? renderParticipants(listUsers) : console.error("listUsers n'est pas un tableau :", listUsers)}
          </h2>
          <audio ref={localAudioRef} autoPlay hidden />
          <audio ref={remoteAudioRef} autoPlay hidden />
          <center><button className='bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={toggleMute}>Activer/Couper le micro</button></center>
          {/* <div>Plugin en variable{myPlug}</div> */}
          {/* <div>plugin en useState{pluginHandle}</div> */}
        </div>
      )}
    </div>
  );
};

export default JanusAudioComponent;

// Le terme JSEP signifie JavaScript Session Establishment Protocol
// SDP (Session Description Protocol)


// import React, { useEffect, useRef, useState } from 'react';
// import adapter from 'webrtc-adapter'; // Importez webrtc-adapter
// import Janus from 'janus-gateway';

// window.adapter = adapter; // Définir l'adaptateur globalement

// const JanusAudioComponent = () => {
//   const [janusInstance, setJanusInstance] = useState(null);
//   const [pluginHandle, setPluginHandle] = useState(null);
//   const localAudioRef = useRef(null); // Référence pour l'audio local
//   const remoteAudioRef = useRef(null); // Référence pour l'audio distant

  
//   const createSession = () => {
//     Janus.init({
//       debug: 'all',
//       callback: () => {
//         const janus = new Janus({
//           server: 'http://localhost:8088/janus', // Votre URL Janus
//           success: () => {
//             janus.attach({
//               plugin: 'janus.plugin.audiobridge',
//               success: (pluginHandle) => {
//                 setPluginHandle(pluginHandle);
//                 // joinRoom(pluginHandle);
//                 // console.log(pluginHandle, "test");
//               },
//               error: (error) => {
//                 console.error('Erreur lors de l\'attachement du plugin:', error);
//               },
//               onmessage: (msg, jsep) => {
//                 console.log('Message:', msg);
//                 if (jsep !== undefined && jsep !== null) {
//                   pluginHandle.handleRemoteJsep({ jsep });
//                 }
//               },
//               onlocalstream: (stream) => {
//                 console.log("Flux local:", stream);
//                 if (localAudioRef.current) {
//                   localAudioRef.current.srcObject = stream;
//                 }
//               },
//               onremotestream: (stream) => {
//                 console.log("Flux distant:", stream);
//                 if (remoteAudioRef.current) {
//                   remoteAudioRef.current.srcObject = stream;
//                 }
//               },
//               oncleanup: () => {
//                 console.log('Nettoyage du plugin');
//               },
//             });
//           },
//           error: (error) => {
//             console.error('Erreur lors de l\'initialisation de Janus:', error);
//           },
//           destroyed: () => {
//             console.log('Session Janus détruite');
//           },
//         });
        
//         setJanusInstance(janus);
//       },
//     });
//   }

//   const joinRoom = (pluginHandle) => {
//     const register = {
//       request: 'join',
//       room: 1234, // Votre ID de salle
//       ptype: 'publisher',
//       display: 'My Display Name',
//     };
//     pluginHandle.send({ message: register });
//   };
  
//   return (
//     <div>
//       <h2>Janus AudioBridge</h2>
//       <h3>Audio Local</h3>
//       <audio ref={localAudioRef}  autoPlay hidden />
//       <h3>Audio Distant</h3>
//       <audio ref={remoteAudioRef} autoPlay controls />
//       <button className='bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={createSession}>start</button>
//       <button className='bg-green-700 rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl' onClick={joinRoom}>join</button>
//     </div>
//   );
// };

// export default JanusAudioComponent;

// https://janus.conf.meetecho.com/docs/JS.html
// https://janus.conf.meetecho.com/docs/rest.html
