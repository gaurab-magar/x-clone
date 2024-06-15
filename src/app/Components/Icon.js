import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { RiShare2Line } from "react-icons/ri";
import { HiSaveAs } from "react-icons/hi";
import { BiRepost } from "react-icons/bi";

const Icon = () => {
  return (
    <div className='flex gap-2 py-2 px-1'>
        <CiHeart className='text-3xl hover:text-red-500 transition duration-200 ease-in-out' />
        <BiRepost className='text-3xl hover:text-red-500 transition duration-200 ease-in-out' />
        <FaRegComment className='text-2xl hover:text-sky-500 transition duration-200 ease-in-out'/>
        <RiShare2Line className='text-2xl hover:text-green-400 transition duration-200 ease-in-out'/>
        <HiSaveAs className='text-2xl hover:text-gray-500 transition duration-200 ease-in-out'/>
    </div>
  )
}

export default Icon