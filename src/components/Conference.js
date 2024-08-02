import {React, useState} from 'react';
import Header from './Header';
import ParticipantList from './ParticipantsList';
import Video from './Video';
import Footer from './Footer';
import ChatRoom from './ChatRoom';
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import OtherUsers from './OtherUsers';
import {DoubleRightOutlined} from "@ant-design/icons";



const Conference = () => {
  const [openChat, setOpenChat] = useState(false)
  const handleOpenChat = () => {
    setOpenChat(true)
    setOpenPartList(false)
    setOpenChatOnSmallSceens(true)
  }
  const [openPartList, setOpenPartList] = useState(false)
  const handleOpenPartList = () => {
    setOpenPartList(true)
    setOpenChat(false)
    setOpenChatOnSmallSceens(true)
  }

  const [openChatOnSmallSceens, setOpenChatOnSmallSceens] = useState(false)
  // const handleOpenChatOnSmallSceens = () => {
  //   setOpenChatOnSmallSceens(true)
  // }
  const handleDestroy = () => {
    setOpenChatOnSmallSceens(false)    
    setOpenChat(false)
    setOpenPartList(false)
  }
   
  return (
     
    <div className=" h-screen bg-gradient-to-r from-[#17161b] to-gray-800 text-white">
      <Header />
      {/* <div className="flex justify-center mt-2">
        <div className="pl-2 mt-1 block md:hidden sm:hidden">
          <div className="text-sm font-bold">Counseling : Beauty Product</div>
          <div className="text-gray-500 text-xs">Customer : Victor Chris <span className="text-focusedBlue text-xs font-bold hover:text-white cursor-pointer">More details {'>'}</span></div>
        </div>
      </div> */}
      <div className='relative flex flex-col md:flex-row p-2 md:h-[82%] ml-1 mt-[30px] sm:mt-[0px]'>
        <div className="basis-full md:basis-9/12 grid md:grid-cols-6 grid-cols-6 grid-rows-2 md:grid-rows-8 gap-1">
          <div className="text-white text-sm rounded-lg col-span-6 sm:col-span-5 md:col-span-5 row-span-8">
            <Video />
          </div>
          {/* <div className="bg-gray-700 text-white flex items-center justify-center text-lg rounded-lg row-span-2 cursor-pointer hover:bg-gray-600 p-1">
            <OtherUsers />
          </div> */}
          {/* <div className="bg-gray-700 text-white text-sm rounded-lg row-span-2">
            <img src={image} alt='ile de test' className='object-cover rounded-lg h-[125px]'/>
          </div>
          <div className="bg-gray-700 text-white text-sm rounded-lg row-span-2">
            <img src={image} alt='ile de test' className='object-cover rounded-lg h-[125px]'/>
          </div>
          <div className="bg-gray-700 text-white text-sm rounded-lg row-span-2">
            <img src={image} alt='ile de test' className='object-cover rounded-lg h-[125px]'/>
          </div> */}
          <div className="bg-gray-700 text-white text-xs sm:text-sm rounded-lg row-span-2 col-span-2 sm:col-span-1">
            <OtherUsers />
          </div>
          <div className="bg-gray-700 text-white text-xs sm:text-sm rounded-lg row-span-2 col-span-2 sm:col-span-1">
            <OtherUsers />
          </div>
          <div className="bg-gray-700 text-white text-xs sm:text-sm rounded-lg row-span-2 hidden sm:col-span-1 md:block col-span-2">
            <OtherUsers />
          </div>
          
          {/* <div className="bg-gray-700 text-white flex items-center justify-center text-center text-sm rounded-lg row-span-2">4</div> */}

          <div className="bg-gray-700 text-white flex items-center justify-center text-center text-lg rounded-lg col-span-2 sm:col-span-1 row-span-2 cursor-pointer hover:bg-gray-600 p-1">
            <div className="mt-3 flex -space-x-2 overflow-hidden p-1">
              <div className='bg-gray-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-white'> 
                {/* <UserOutlined /> */}
                <img src={avatar1} alt="null" className="sm:w-8 sm:h-8 w-6 h-6 rounded-full" />
              </div>
              <div className='bg-gray-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-white'> 
                {/* <UserOutlined /> */}
                <img src={avatar2} alt="null" className="sm:w-8 sm:h-8 w-6 h-6 rounded-full" />
              </div>
              <div className='bg-gray-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-white'> 
                {/* <UserOutlined /> */}
                <img src={avatar1} alt="null" className="sm:w-8 sm:h-8 w-6 h-6 rounded-full" />
              </div>
              <div className='bg-transparent w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center pl-2'> 
                <DoubleRightOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:block md:basis-3/12 md:grid md:grid-cols-1 pl-1 mr-1'>
          <div className={`${openChatOnSmallSceens === false ? 'hidden' : ''} flex justify-center sm:block`}>
            <div className='top-0 absolute  sm:relative'>
              <span className='absolute mt-0.5 right-0.5 top-0 text-white bg-gray-400 px-3 rounded-lg hover:cursor-pointer hover:bg-red-500 sm:hidden block' onClick={handleDestroy}>x</span>
                {openChat ? <ChatRoom /> : <ParticipantList />} 
            </div>
          </div>
        </div>
      </div>
      <div className='mt-32 sm:mt-0'>
        <Footer openChatPart={handleOpenChat} stateOpenChat={openChat} openParticipants={handleOpenPartList} stateOpenParticipants={openPartList} />
      </div>
    </div>
  );
};

export default Conference;
