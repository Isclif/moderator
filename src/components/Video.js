import React from 'react';
// import videoSource from './video.mp4'
import { AudioOutlined } from "@ant-design/icons";


const Video = ({ name, isMain }) => {
  return (
    <div className="relative  bg-gray-400 rounded-lg h-full w-full">
      <video 
        className="rounded-lg object-cover w-full h-full " 
        autoPlay 
        muted 
        loop
      >
        <source src={"videoSource"} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      {/* <iframe class="w-full aspect-video ..." src={videoSource}></iframe> */}
      <div className="absolute top-1 left-1 text-white bg-black bg-opacity-50 p-2 rounded">
        <AudioOutlined />
        &nbsp; Georges Youm
      </div>
    </div>
  );
};

export default Video;