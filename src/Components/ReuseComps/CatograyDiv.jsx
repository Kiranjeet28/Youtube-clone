import React from 'react'
function CatograyDiv({id,functions,title}) {
return (
    <li key={id} onClick={() => functions}
              className=' h-7 w-max mr-1 ml-1 bg-gray-200 rounded-md flex items-center justify-center p-2  hover:bg-gray-300 '>
                <p className='w-max'>{title}</p>
              </li>
)
}
export default CatograyDiv;