import {useState, React} from "react"
import { FileImageOutlined, SendOutlined } from '@ant-design/icons';
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'

const ChatRoom = (props) => {

const [openMessageriePrivee, setOpenMessageriePrivee] = useState(true)
const handleOpenPrivate = () => {
  setOpenMessageriePublic(false)
  setOpenMessageriePrivee(true)
  setOpenMessagerieSupport("notOpen")

} 

const [openMessageriePublic, setOpenMessageriePublic] = useState(false)
const handleOpenPublic = () => {
  setOpenMessageriePrivee(false)
  setOpenMessageriePublic(true)
  setOpenMessagerieSupport("notOpen")

} 

const [openMessagerieSupport, setOpenMessagerieSupport] = useState("notOpen")
const handleOpentChatSupport = () => {
  setOpenMessageriePrivee(false)
  setOpenMessageriePublic(false)
  setOpenMessagerieSupport("isOpen")
}

const ChatBubble = ({ message, isSender, profilePic, name, time }) => {
  return (
    <div className={`relative flex items-start ${isSender ? 'justify-end' : 'justify-start'}`}>
      {!isSender && (
        <img
          src={profilePic}
          alt={`${name}'s profile`}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <span className={`${isSender ? 'circle1' : 'circle'}`}></span>
      <div>
        {!isSender && <div className="text-sm text-gray-500 flex">{name}<span className="bg-gray-500 text-white rounded-lg mb-0.5 ml-0.5 px-0.5 text-xs">expert</span></div>}
        {isSender && <div className="text-sm text-gray-500 right-0 flex flex-row-reverse">{name}<span className="bg-gray-500 text-white rounded-lg mb-0.5 mr-0.5 px-0.5 text-xs">expert</span></div>}
        <div className={` w-48 break-words p-2 text-sm rounded-lg ${isSender ? ' message-box1 bg-gray-500 text-white' : ' message-box bg-gray-200 text-gray-900'}`}>
          {message}
        </div>
        {!isSender && <div className="text-xs text-gray-400 mt-1">{time}</div>}
        {isSender && <div className="text-xs text-gray-400 mt-1 flex flex-row-reverse">{time}</div>}
      </div>
        {/* 
      {isSender ? (
        <div className="absolute right-0 top-0 transform translate-x-full right-12 pt-5">
          <div className="w-0 h-0 border-t-8 border-t-gray-500 border-b-8 border-l-8 border-l-gray-500 border-b-transparent"></div>
        </div>
      ) : (
        <div className="absolute left-0 top-0 transform -translate-x-full left-12 pt-5">
          <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-gray-200 border-t-gray-200 border-b-transparent"></div>
        </div>
      )} */}
      
      {isSender && (
        <img
          src={profilePic}
          alt={`${name}'s profile`}
          className="w-10 h-10 rounded-full ml-2"
        />
      )}
    </div>
  );
};

// const participantsChatDroit = [
//   { id:1, name: 'Georges Youm', heure: '12h00', status: "paneliste" },
//   { id:2, name: 'Alecia Keys', heure: '23h10', status: "vip"},
//   { id:3, name: 'Burna Boy', heure: '08h20', status: "moderateur" },
// ];

// const participantsChatGauche = [
//   { id:1, name: 'You', heure: '12h00', status: "vip"}
// ];
// w-[325px]
  return (
    <aside className="p-4 bg-gray-100 rounded-lg h-[502px]">
      <span className="flex justify-between pt-2">
        <h2 className={`${openMessageriePrivee ? "text-base font-bold mb-4 text-black cursor-pointer" : "text-base  mb-4 text-gray-600 cursor-pointer"}`} onClick={handleOpenPrivate}>Private</h2>
        <h2 className={`${openMessageriePublic ? "text-base font-bold mb-4 text-black cursor-pointer" : "text-base  mb-4 text-gray-600 cursor-pointer"}`} onClick={handleOpenPublic}>Public</h2>      
        <h2 className={`${openMessagerieSupport === "isOpen" ? "text-base font-bold mb-4 text-black cursor-pointer" : "text-base  mb-4 text-gray-600 cursor-pointer"}`} onClick={handleOpentChatSupport}>Support</h2>     
      </span>
      <hr />
      {openMessageriePrivee ? 
        <div>
          <center><h3 className="text-xs mb-1 pt-2 text-gray-500">Messagerie privée</h3></center>
          <div className='h-[340px] overflow-auto scrollbar rounded pt-1 pl-1 mb-2 bg-gradient-to-r from-gray-100 to-brandWhite'>
            <div className="flex flex-col space-y-4 p-1 ">
              <ChatBubble
                message="Hello, how are you? text-base font-bold mb-4 text-black cursor-pointer"
                isSender={false}
                profilePic={avatar1}
                name="John Doe"
                time="10:00 AM"
              />
              <ChatBubble
                message="I'm good, thanks! How about you?"
                isSender={true}
                profilePic={avatar2}
                name="Me"
                time="10:01 AM"
              />
              <ChatBubble
                message="I'm doing well. What are you up to? "
                isSender={false}
                profilePic={avatar1}
                name="John Doe"
                time="10:02 AM"
              />
              <ChatBubble
                message="Just working on some projects."
                isSender={true}
                profilePic={avatar2}
                name="Me"
                time="10:03 AM"
              />
            </div>
          </div>
        </div>
        : openMessageriePublic ?
        <div>
          <center><h3 className="text-xs mb-1 pt-2 text-gray-500">Messagerie public</h3></center>
          <div className='h-[340px] overflow-auto scrollbar rounded pt-1 pl-1 mb-2 bg-gradient-to-r from-gray-100 to-brandWhite'>
            <div className="flex flex-col space-y-4 p-1 ">
                <ChatBubble
                  message="Hello, how are you? text-base font-bold mb-4 text-black cursor-pointer"
                  isSender={false}
                  profilePic={avatar1}
                  name="John Doe"
                  time="10:00 AM"
                />
                <ChatBubble
                  message="I'm good, thanks! How about you?"
                  isSender={true}
                  profilePic={avatar2}
                  name="Me"
                  time="10:01 AM"
                />
                <ChatBubble
                  message="I'm doing well. What are you up to? "
                  isSender={false}
                  profilePic={avatar1}
                  name="John Doe"
                  time="10:02 AM"
                />
                <ChatBubble
                  message="Just working on some projects."
                  isSender={true}
                  profilePic={avatar2}
                  name="Me"
                  time="10:03 AM"
                />
              </div>
          </div>
        </div>
      : 
        <div>
            <center><h3 className="text-xs mb-1 pt-2 text-gray-500">Messagerie du support</h3></center>
            <div className='h-[340px] overflow-auto scrollbar rounded pt-1 pl-1 mb-2 bg-gradient-to-r from-gray-100 to-brandWhite'>
              <div className="flex flex-col space-y-4 p-1 ">
                <ChatBubble
                  message="Hello, how are you? text-base font-bold mb-4 text-black cursor-pointer"
                  isSender={false}
                  profilePic={avatar1}
                  name="John Doe"
                  time="10:00 AM"
                />
                <ChatBubble
                  message="I'm good, thanks! How about you?"
                  isSender={true}
                  profilePic={avatar2}
                  name="Me"
                  time="10:01 AM"
                />
                <ChatBubble
                  message="I'm doing well. What are you up to? "
                  isSender={false}
                  profilePic={avatar1}
                  name="John Doe"
                  time="10:02 AM"
                />
                <ChatBubble
                  message="Just working on some projects."
                  isSender={true}
                  profilePic={avatar2}
                  name="Me"
                  time="10:03 AM"
                />
              </div>
            </div>
          </div>
        }
      <hr />
      <div className="flex justify-between">
        <button className="px-4 bg-gray-500 text-white py-2 mr-2 mt-2 rounded hover:bg-gray-800 hover:text-white"> <FileImageOutlined /> </button>
        <input className="text-black text-sm w-44 h-10 mt-2 p-1 outline-none rounded bg-customBlue" placeholder="Taper un message..."></input>
        <button className="bg-blue-500 px-4 py-2 ml-2 mt-2 rounded text-white hover:bg-blue-800">
          <SendOutlined />
        </button>
      </div>
    </aside>
  )
};

export default ChatRoom;

// import React, { useState } from 'react';
// import './index.css'; // Assurez-vous que Tailwind est importé

// // Les composants que nous allons rendre
// const Home = () => <div>Home Component</div>;
// const About = () => <div>About Component</div>;
// const Services = () => <div>Services Component</div>;
// const Contact = () => <div>Contact Component</div>;

// const App = () => {
//   const [activeComponent, setActiveComponent] = useState('Home');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'Home':
//         return <Home />;
//       case 'About':
//         return <About />;
//       case 'Services':
//         return <Services />;
//       case 'Contact':
//         return <Contact />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="bg-gray-100 h-screen">
//       <nav className="bg-blue-600 p-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="text-white text-lg font-bold">
//             MyWebsite
//           </div>
//           <ul className="flex space-x-4">
//             <li>
//               <button 
//                 onClick={() => setActiveComponent('Home')}
//                 className={`text-white hover:text-gray-300 ${activeComponent === 'Home' ? 'bg-gray-700 p-2 rounded' : ''}`}
//               >
//                 Home
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveComponent('About')}
//                 className={`text-white hover:text-gray-300 ${activeComponent === 'About' ? 'bg-gray-700 p-2 rounded' : ''}`}
//               >
//                 About
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveComponent('Services')}
//                 className={`text-white hover:text-gray-300 ${activeComponent === 'Services' ? 'bg-gray-700 p-2 rounded' : ''}`}
//               >
//                 Services
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveComponent('Contact')}
//                 className={`text-white hover:text-gray-300 ${activeComponent === 'Contact' ? 'bg-gray-700 p-2 rounded' : ''}`}
//               >
//                 Contact
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <div className="container mx-auto p-4">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default App;
