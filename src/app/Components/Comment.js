'use client'
import React from 'react';
import Image from 'next/image';

const Comment = ({comment,id}) => {
  return (
    <div className='border-b py-2'>
    <div className='flex items-start gap-1 pl-10'>
        <Image src={comment.userImg} alt='imagepost' className='rounded-full h-9 w-9 p-1 object-cover object-center' width={40} height={40}/>
        <div className='flex flex-col p-1 w-full'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <p className='font-bold text-sm'>{comment?.name}</p>
                    <h2 className='font-light text-sm'>@{comment?.username}</h2>
                </div>
            </div>
            <p className='py-2 font-semibold text-sm'>{comment?.comment}</p>
        </div>
    </div>

</div>
  )
}

export default Comment