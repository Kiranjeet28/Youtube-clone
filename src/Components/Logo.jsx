import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center justify-center">
    <FontAwesomeIcon className='text-red-500 text-[2.5vh] md:text-[3vh]' icon={faYoutube} />
    <div className='flex items-center text-[2vh] md:text-[3vh] font-sans font-bold'> YouTube</div>
    </div>
  )
}

export default Logo