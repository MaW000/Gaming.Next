import React from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image'

function PlayerCard() {
  const { data: sessionData } = useSession();
  
  const image = sessionData?.user?.image
  return (
    <div className='p-10 bg-gray-600 text-center' >
     
      <div className=''>
        <Image width={100} height={100} src={image} alt="discord"/> 
        <h1>{sessionData?.user?.name}</h1>
      </div>
    </div>
  )
}

export default PlayerCard