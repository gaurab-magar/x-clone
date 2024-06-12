'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

const Sidebar = () => {
    const {data: session} = useSession();
  return (
    <div className='p-3 h-full flex flex-col gap-4'>
        <Link href='/'>
            <FaXTwitter className='w-16 h-16 hover:bg-gray-100 cursor-pointer p-3 rounded-full transition-all duration-200' />
        </Link>
        <Link href='/' className='flex items-center justify-center gap-2 w-fit hover:bg-gray-100 p-3 cursor-pointer rounded-full transition-all duration-200'>
            <TiHome className='w-7 h-7' />
            <span className='font-semibold hidden md:inline'>
                Home
            </span>
        </Link>
        {
            session ? (
                <button onClick={()=>signOut()} className='hidden md:inline w-48 h-9 bg-blue-400 text-white font-semibold  rounded-full shadow-md hover:scale-105 duration-100 transition-all ease-in-out'>
                    Sign Out
                </button>
            ):(
                <button onClick={()=>signIn()} className='hidden md:inline w-48 h-9 bg-blue-400 text-white font-semibold  rounded-full shadow-md hover:scale-105 duration-100 transition-all ease-in-out'>
                    Sign In
                </button>
            )
        }
        <div className='mt-auto mb-6'>
            {session && (
                <div className='p-2 flex items-start hover:bg-gray-200 cursor-pointer rounded-md transition duration-200 text-sm text-gray-600'>
                    <div className='flex items-center gap-3 '>
                        <Image src={session.user.image} alt='user-img' width={40} height={40} className='rounded-full' />
                        <div>
                            <h3 className='font-semibold text-gray-700' >{session.user.name}</h3>
                            <p className='text-gray-500 font-light'>@{session.user.username}</p>
                        </div>
                    </div>
                        <BsThreeDots className='ml-2 text-lg'/>
                </div>
            )}
        </div>
    </div>
  )
}

export default Sidebar