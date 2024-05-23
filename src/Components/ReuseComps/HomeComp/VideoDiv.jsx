import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser } from '@fortawesome/free-solid-svg-icons';

import React from 'react'

function VideoDiv({Thumbmail,ChannelPP,title,ChannelTitle,viewCount,UploadTime}) {
return (

                  <div className="flex flex-col m-3 w-[250px] " >
                    <img 
                      className="m-1 rounded-md h-[160px] w-[240px] hover:rounded-none"
                      src={Thumbmail} 
                      alt="Video Thumbnail" 
                    />
                    <div className="flex" >
                      {ChannelPP ? (
                        <img 
                          src={ChannelPP}
                          className="w-[30px] h-[30px] m-[6px] rounded-full " 
                          alt="Channel Logo"
                        />
                      ) : (
                        <div className="w-[30px] h-[30px] m-[6px] rounded-full bg-gray-300 flex justify-center items-center">
                          <span className="text-gray-600">
                              <FontAwesomeIcon icon={faUser} className='text-gray-300 text-[2.1vh] md:text-[3vh]' />
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <p className="font-bold text-sm h-[44px] w-[190px] p-1 overflow-clip m-[1px]">{title}</p>
                        <span className="text-[11px] text-gray-700 m-[1px] ml-[4px]">{ChannelTitle}</span>
                        <div className="text-[11px] text-gray-700 flex">
                          <span className="ml-[4px]">{viewCount}</span>
                          <span className="ml-[4px] text-bold">.</span>
                          <span className="ml-[4px]">{UploadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
)
}
export default VideoDiv