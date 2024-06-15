'use client'
import React, { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { RiShare2Line } from "react-icons/ri";
import { HiSaveAs } from "react-icons/hi";
import { BiRepost } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '@/Firebase';
import { FcLike } from "react-icons/fc";



const Icon = ({id,uid}) => {
    const { data: session } = useSession();
    const [hasLiked, setHasLiked] = useState(false);
    const [Likes, setLikes] = useState([]);
    const db = getFirestore(app);
  
    useEffect(() => {
      onSnapshot(collection(db, 'posts', id, 'Likes'), (snapshot) => {
        setLikes(snapshot.docs);
      });
    }, [db, id]);
  
    useEffect(() => {
      if (Likes) {
        setHasLiked(Likes.some((like) => like.id === session?.user?.uid));
      }
    }, [Likes, session]);
  
    const likePost = async () => {
      try {
        if (hasLiked) {
          await deleteDoc(doc(db, 'posts', id, 'Likes', session?.user?.uid));
        } else {
          await setDoc(
            doc(db, 'posts', id, 'Likes', session?.user?.uid),
            { username: session?.user?.username }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    const deletePost = async()=>{
        if(window.confirm('Are you sure you want to remove this post ?')){
            await deleteDoc(doc(db,'posts',id)).then(()=>{
                console.log('Document successfully deleted');
                window.location.reload();
            })
        }else {
            alert('you are not authorized to delete this post');
        }
    }
  
    if (!session) {
      return <div>You must be logged in to like a post.</div>;
    }
  return (
    <div className='flex gap-2 py-2 px-1'>
        <div className='flex gap-1 items-center'>
            {hasLiked ?(
                <FcLike onClick={likePost} className='text-red-500 text-2xl' />
            ):(
                <CiHeart onClick={likePost} className='text-3xl hover:text-red-500 transition duration-200 ease-in-out' />
            )}
            {Likes.length > 0 && (
                <span className='text-md font-semibold'>{Likes.length}</span>
            )}
        </div>
        <BiRepost className='text-3xl hover:text-red-500 transition duration-200 ease-in-out' />
        <FaRegComment className='text-2xl hover:text-sky-500 transition duration-200 ease-in-out'/>
        <RiShare2Line className='text-2xl hover:text-green-400 transition duration-200 ease-in-out'/>
        <HiSaveAs className='text-2xl hover:text-gray-500 transition duration-200 ease-in-out'/>
        {session?.user?.uid === uid && (
            <MdOutlineDelete onClick={deletePost} className='text-2xl hover:text-red-500 transition duration-200 ease-in-out'/>
        )}
    </div>
  )
}

export default Icon