import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniNewspaper } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='py-3 px-4 flex items-center justify-between bg-white bg-opacity-60 sticky bottom-0 shadow-slate-300 shadow-inner'>
        <GoHomeFill className='text-2xl' />
        <IoSearch className='text-2xl' />
        <FaUserFriends className='text-2xl' />
        <HiMiniNewspaper className='text-2xl' />
        <FaRegCircleUser className='text-2xl' />
    </div>
  )
}

export default Footer