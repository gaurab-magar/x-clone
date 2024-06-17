import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import Icon from './Icon';


const Post = ({post,id}) => {

  return (
    <div className='border-b py-2'>
        <div className='flex items-start gap-1'>
            <Image src={post?.ProfileImg} alt='imagepost' className='rounded-full h-12 w-12 p-1 object-cover object-center' width={40} height={40}/>
            <div className='flex flex-col p-1 w-full'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <p className='font-bold'>{post.name}</p>
                        <h2 className='font-light text-sm'>@{post.username}</h2>
                    </div>
                    <BsThreeDots className='text-4xl px-2' />
                </div>
                <p className='py-2 font-semibold'>{post.text}</p>
                <Link href={`/post/${id}`}>
                    <div className='h-80'>
                        <Image src={post.image} alt='uploadedImage' className='object-cover w-full h-full rounded-2xl shadow-md' width={50} height={50} />
                    </div>
                </Link>
                <Icon id={id} uid={post.uid} />
            </div>
        </div>

    </div>
  )
}

export default Post