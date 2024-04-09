import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';
function SugSearch({id,titleVideo,functions}) {
return (
<li   key={id} 
      onClick={functions} // Assuming functions is the function you want to call
      className='text-xsm md:text-md  p-1 md:p-2 flex  items-center'
>
    <FontAwesomeIcon icon={faSearch} className='text-gray-400 text-[1.6vh] md:text-[3vh]' />
    <span className='ml-6'>{titleVideo}</span>
</li>
)
}
export default SugSearch