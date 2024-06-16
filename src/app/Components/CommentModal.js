'use client'
import React, { useEffect, useState } from 'react'
import { modalState, postIdState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { HiX } from 'react-icons/hi';
import { app } from '@/Firebase';
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Post from './Post';

const CommentModal = () => {

    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const [post , setPost] = useState({});
    const [input,setInput] = useState('');
    const {data:session} = useSession();
    const db = getFirestore(app)
    const router = useRouter();

    useEffect(()=>{
      if(postId !== ''){
        const postRef = doc(db,'posts',postId)
        const unsubscribe = onSnapshot(
          postRef,(snapshot)=>{
            if(snapshot.exists()){
              setPost(snapshot.data())
            }else{
              alert('There is no such document')
            }
          }
        )
        return ()=> unsubscribe();
      }
    },[postId])

    const sendComment = async()=>{
     addDoc(collection(db,'posts',postId,'comments'),{
        name: session.user.name,
        username: session.user.username,
        userImg: session.user.image,
        comment: input,
        timestamp: serverTimestamp(),
     }).then(()=>{
        setInput('');
        setOpen(false);
        router.push(`/post/${postId}`)
     }).catch((error) =>{
        console.log('Error adding docuemnt error',error)
     })
    }

  return (
    <div>
        {open && (
          <Modal isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
            className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
          >
            <div className='p-4'>
              <div className='border-b border-gray-200 py-4 px-1.5'>
                <HiX className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer' onClick={()=>setOpen(false)} />
              </div>
              <div className='p-2 flex items-center space-x-1 relative'>
                  <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-400'></span>
                  <Image src={post?.ProfileImg} alt='modaluser'  width={40} height={40} className='rounded-full h-11 w-11 mr-4' />
                  <h4 className='font-bold '>{post?.name}</h4>
                  <span className='text-sm font-light truncate'>@{post?.username}</span>
              </div>
              <p className='text-gray-500 text-base ml-16 mb-2'>
                {post?.text}
              </p>
              <div className='flex p-3 space-x-3'>
                <Image src={session.user.image} alt='modaluser'  width={40} height={40} className='rounded-full h-11 w-11 mr-4' />
                <div>
                  <textarea value={input} onChange={(e)=>setInput(e.target.value)} className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-600 placeholder:text-gray-400 '
                  placeholder='Whats happening ?'
                  rows='2'></textarea>
                </div>
                <div className='flex items-center justify-end pt-2 '> 
                   <button disabled={input.trim() === ''} onClick={sendComment} className='bg-blue-500 disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md'>
                     Tweet
                   </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
    </div>
  )
}

export default CommentModal