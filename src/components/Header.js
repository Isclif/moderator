import React from "react"
import { MenuOutlined, VideoCameraFilled, PauseOutlined, XFilled } from "@ant-design/icons";

const Header = (props) => {
  return (
    <header className="relative flex justify-between items-center p-1 bg-gray-800 text-white bg-transparent">
      <div>
        <div className="flex">
          <span className="bg-customGray rounded pl-2 pr-2 ml-2 mt-1.5 hover:bg-blue-600 cursor-pointer h-8 text-xl">
            <MenuOutlined />
          </span>
          <div className="pl-2 mt-1 md:block hidden">
            <div className="text-sm font-bold">Counseling : Beauty Product</div>
            <div className="text-gray-500 text-xs">Customer : Victor Chris <span className="text-focusedBlue text-xs font-bold hover:text-white cursor-pointer">More details {'>'}</span></div>
          </div>
        </div>

      </div>
      <div className="flex justify-center">
        <div className="absolute flex space-x-2 top-3">
          <span className="text-red-600 text-sm pt-0.5">
            <VideoCameraFilled />
          </span>

          <span className="text-sm pt-0.5">Recording...</span> 

          <span className="bg-customGray rounded text-sm flex justify-center p-1 hover:bg-blue-600 cursor-pointer">
            <PauseOutlined />
          </span>
          <span className="bg-customGray rounded text-sm flex justify-center p-1 hover:bg-red-600 cursor-pointer">
            <XFilled />
          </span>
        </div>
      </div>
      {/* <button className="bg-red-500 text-xs px-4 py-2 mr-2 rounded">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        End Meeting
      </button> */}
      <div class="mr-2">
          <button class="bg-red-500 text-white-400 py-2 px-4 rounded-lg text-xs">
            End Meeting
          </button>
          {/* <span class="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
          </span> */}
      </div>
    </header>
  )
};

export default Header;
