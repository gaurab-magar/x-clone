'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'
import { CiCirclePlus } from "react-icons/ci";

const Input = () => {
    const {data:session} = useSession();
  return (
    <div className='py-2'>
        {session && (
            <div>
                <div className='border-b border-gray-300 flex items-start justify-center gap-4 w-full'>
                    <Image src={session.user.image} alt='user-img' width={40} height={40} className='rounded-full' />
                    <textarea rows={2} type='text' placeholder='Whats happening ?' className='p-1 outline-none w-full' />
                </div>
                <div className='flex items-center justify-between p-2'>
                    <CiCirclePlus className='text-4xl text-blue-600 hover:text-blue-800 hover:scale-105 transition duration-200 cursor-pointer' />
                    <button className='bg-blue-400 text-white font-semibold rounded-full px-4 py-1 hover:scale-105 transition duration-200'>Post</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Input