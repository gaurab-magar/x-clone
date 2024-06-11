import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";

const Sidebar = () => {
  return (
    <div className='p-3 flex flex-col gap-4'>
        <Link href='/'>
            <FaXTwitter className='w-16 h-16 hover:bg-gray-100 cursor-pointer p-3 rounded-full transition-all duration-200' />
        </Link>
        <Link href='/' className='flex items-center justify-center gap-2 w-fit hover:bg-gray-100 p-3 cursor-pointer rounded-full transition-all duration-200'>
            <TiHome className='w-7 h-7' />
            <span className='font-semibold hidden md:inline'>
                Home
            </span>
        </Link>
        <button className='hidden md:inline w-48 h-9 bg-blue-400 text-white font-semibold  rounded-full shadow-md hover:scale-105 duration-100 transition-all ease-in-out'>
            Sign In
        </button>
    </div>
  )
}

export default Sidebar