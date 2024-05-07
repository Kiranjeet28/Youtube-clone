import React, { useState, useEffect,useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faVideo, faUser, faCopy } from '@fortawesome/free-solid-svg-icons';
import { formatViewCount } from '../../Functions/ViewCount'; 
import {ApiPPChannel} from '../../ReuseComps/ApiCalls/ApiPPChannel'
import { NavLink } from 'react-router-dom';
import ButtonSubscribe from './ButtonSubscribe';

const fetchProfilePhotoUrl = async (ProfilePhoto) => {
  try {
    // Assuming ApiPPChannel is a function to fetch the profile photo URL
    const photoUrl = await ApiPPChannel(ProfilePhoto);
    return photoUrl;
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    return ''; // Return an empty string in case of error
  }
};

function TruncatedDescription({ desc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`p-3 font-semibold text-xs overflow-hidden ${isExpanded ? '' : 'h-16'}`}>
        <p>{desc}</p>
      </div>
      {desc.length > 80 && (
        <div className="mt-2">
          <button className="text-blue-500 text-sm hover:text-blue-700" onClick={toggleExpand}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
}

function Desc({ Title, ProfilePhoto, ChannelName, Like, views, timeAgo, desc, id }) {
  const [url, setUrl] = useState('');
  const [copytext,setCopytext] =useState('copy the link ')

  const copyPasswordToClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(id)
    setCopytext("copied")
  },[id]) 

  useEffect(() => {
    if (ProfilePhoto) {
      fetchProfilePhotoUrl(ProfilePhoto).then(photoUrl => {
        setUrl(photoUrl);
      });
      setCopytext("copy the link ")
    }
  }, [ProfilePhoto]);

  return (
    <div className="md:w-[70vw] md:h-auto w-[80vw] h-[30vh] m-[4vh] mt-[2vh] ">
      <h1 className="text-[3vh] font-bold">{Title}</h1>
      <div className="flex flex-row m-[0.5vw] items-center">
        {ProfilePhoto ? (
          <img className="h-[7vh] w-auto rounded-full m-1" src={url} alt="" />
        ) : (
          <FontAwesomeIcon className="text-black text-[2.1vh] md:text-[3vh]" icon={faUser} />
        )}

        <div id="Channel">
          <h2 className="font-bold m-1 mr-5">{ChannelName}</h2>
        </div>
       <ButtonSubscribe
       channel_Title = {ChannelName}
       urlProfile = {url}/>

        <div className="m-2">
          <div className="flex flex-row rounded-full text-black p-1 pl-3 pr-3 text-xs font-bold bg-gray-200 w-[7vw] justify-between ">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon className="text-black text-[2.1vh] md:text-[3vh]" icon={faThumbsUp} />
              <span className="text-xs">{formatViewCount(Like)}</span>
            </div>
            |
            <FontAwesomeIcon className="text-black text-[2.1vh] md:text-[3vh]" icon={faThumbsDown} />
          </div>
        </div>
        <div className="m-2">
          <input type="text" values={id} readOnly />
          <FontAwesomeIcon  className="text-black text-[2.1vh] md:text-[3vh]"  icon={faCopy} onClick={copyPasswordToClipBoard}  />
          <span>{copytext}</span>
        </div>
        <NavLink to="/lobby" >
        <div className="m-2">
          <FontAwesomeIcon className="text-black text-[2.1vh] md:text-[3vh]"  icon={faVideo} />
        </div>
        </NavLink>
        
      </div>

      <div className="h-max rounded-md bg-gray-200">
        <div>
          <span className="font-bold mr-3">{formatViewCount(views)} views</span>
          <span className="font-bold mr-3">{timeAgo}</span>
        </div>
        <TruncatedDescription desc={desc} />
      </div>
    </div>
  );
}

export default Desc;
