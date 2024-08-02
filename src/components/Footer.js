import React from "react"
import { VideoCameraFilled, AudioFilled, MutedFilled } from "@ant-design/icons";
import { ChatBubbleLeftRightIcon, UserGroupIcon } from '@heroicons/react/16/solid';

const Footer = ({ openChatPart, stateOpenChat, openParticipants, stateOpenParticipants} ) => {
  return (
    <footer>
      <div  className="flex justify-between mr-2 ml-2 pb-1 text-white bg-transparent">

        <span className="flex md:ml-[250px]">
          <div className="bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer md:h-12 text-xl items-center justify-center text-center md:px-6">
            <div>
              🤚
            </div>        
            <div className="text-xs">
              Hand
            </div>
          </div>

          <div className="bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl items-center justify-center text-center">
            <div>
              <MutedFilled />
            </div>        
            <div className="text-xs">
              Speaker
            </div>
          </div>

          <div className="bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl items-center justify-center text-center md:px-6">
            <div>
              <AudioFilled />
            </div>        
            <div className="text-xs">
              Micro
            </div>
          </div>

          <div className="bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl items-center justify-center text-center md:px-6">
            <div>
              <VideoCameraFilled />
            </div>        
            <div className="text-xs">
              VCam
            </div>
          </div>
        </span>
        <span className="flex">
          <div className={`${stateOpenChat ? "bg-customGray rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl flex flex-col items-center md:px-5" : "bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl flex flex-col items-center md:px-5" }`}  onClick={() => openChatPart()}>
            <div className="relative">
              <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />
              <span class="absolute top-1.5 right-1 -mt-1 -mr-1 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>  
            </div>        
            <div className="text-xs">
              Chat
            </div>
          </div>
          <div className={` ${stateOpenParticipants === true ? "bg-customGray rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl flex flex-col items-center" : "bg-transparent rounded px-2 mr-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-12 text-xl flex flex-col items-center" }`}  onClick={()=>openParticipants()}>
            <div>    
              <UserGroupIcon className="h-7 w-7 text-white" />
            </div>  
            <div className="text-xs">
              People
            </div>
          </div>
        </span>
      </div>   
    </footer>
  )
};

export default Footer;
