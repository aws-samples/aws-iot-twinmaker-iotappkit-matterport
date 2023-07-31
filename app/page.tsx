'use client'

import TwinMakerScene from '@/components/twinmaker/TwinMakerScene'
import useAuth from '@/hooks/useAuth'

import Image from 'next/image'

export default function Home() {
  const {credentials} = useAuth()
  return ( 

      <div className='relative flex-grow w-full'>
        {
          credentials.authenticated ? (
            <TwinMakerScene/>
          ) : (<></>)
        }

      
      </div>
  )
}
