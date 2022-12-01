import React from 'react'
import Image from 'next/image'

interface actionType {
  image: string,
  username: string,
 
}

function PlayerCard({image, username}: actionType ) {
  return (
    <div className='p-10 bg-gray-600 text-center rounded' >
     
      <div className=''>
        <Image width={100} className='rounded-full' height={100} src={image} alt="discord"/> 
        <h1>{username}</h1>
      </div>
    </div>
  )
}

export default PlayerCard