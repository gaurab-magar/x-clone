'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';
import { app } from '@/Firebase';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';


const Comment = ({comment,commentId,postId}) => {
    const [hasLiked , setHasLiked] = useState(false);
    const [Likes , setLikes] = useState([]);
    const db = getFirestore(app);
    const {data:session} = useSession();

    useEffect(()=>{
        onSnapshot(collection(db,'posts',postId,'comments',commentId,"Likes"),(snapshot)=>{
            setLikes(snapshot.docs)
        })
    },[db,id])

    useEffect(() => {
        if (Likes) {
          setHasLiked(Likes.some((like) => like.id === session?.user?.uid));
        }
      }, [Likes, session]);
    
      const likePost = async () => {
        try {
          if (hasLiked) {
            await deleteDoc(doc(db, 'posts', postId, 'comments', commentId ,'Likes' , session?.user?.uid));
          } else {
            await setDoc(
              doc(db, 'posts', postId, 'comments',commentId, 'Likes', session?.user?.uid),
              { username: session?.user?.username }
            );
          }
        } catch (error) {
          console.error(error);
        }
      };

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
            {hasLiked ?(
                <FcLike onClick={likePost} className='text-red-500 text-2xl' />
            ):(
                <CiHeart onClick={likePost} className='text-3xl hover:text-red-500 transition duration-200 ease-in-out' />
            )}
            {Likes.length > 0 && (
                <span className='text-md font-semibold'>{Likes.length}</span>
            )}
        </div>
    </div>

</div>
  )
}

export default Comment