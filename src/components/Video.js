import React from 'react';
// import videoSource from './video.mp4'
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";


const Video = ({ name, idUser, stateMic }) => {
  return (
    <div className="relative  bg-gray-500 rounded-lg h-full w-full">
      <video 
        className="rounded-lg object-cover w-full h-full " 
        autoPlay 
        muted 
        loop
      >
        <source src={"videoSource"} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      {/* <div className="flex justify-center h-[90px] sm:h-[123px] text-5xl rounded-lg">
          <UserOutlined />
      </div> */}
      
      {/* <iframe class="w-full aspect-video ..." src={videoSource}></iframe> */}
      <div className="absolute top-1 left-1 text-white bg-black bg-opacity-50 p-2 rounded">
        {stateMic ? <AudioOutlined /> : <AudioMutedOutlined />}
        &nbsp; {idUser} : {name}
      </div>
    </div>
  );
};

export default Video;