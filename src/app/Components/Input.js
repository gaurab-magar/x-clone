'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/Firebase';
import { addDoc,collection,getFirestore,serverTimestamp } from 'firebase/firestore';
const Input = () => {
    const {data:session} = useSession();
    const imagePicRef = useRef();

    const [imageFileUrl , setImageFileUrl] = useState(null);
    const [selectedImage , setSelectedImage] = useState(null);
    const [loading , setLoading] = useState(false);

    const [text , setText] = useState('');
    const db = getFirestore(app)

    function addImageToPost (e){
        const file = e.target.files[0];
        if(file){
            setSelectedImage(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    useEffect(()=>{
        if(selectedImage){
            uploadImagrToStorage();
        }
    },[selectedImage])

    const uploadImagrToStorage = () =>{
        setLoading(true)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedImage.name;
        const storageRef = ref(storage , fileName);
        const uploadTask = uploadBytesResumable(storageRef , selectedImage);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Uploading is' + progress + '% done');
            },(error)=>{
                console.log(error)
                setLoading(false)
                setImageFileUrl(null)
                setImageFileUrl(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL);
                    setLoading(false);
                })
            }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = await addDoc(collection(db,'posts'),{
            uid: session.user.uid,
            name: session.user.name,
            username: session.user.username,
            text,
            ProfileImg: session.user.image,
            image: imageFileUrl,
            Timestamp: serverTimestamp()
        });
        setText('');
        setImageFileUrl(null);
        setSelectedImage(null);
    }
  return (
    <div className='py-2'>
        {session && (
            <div>
                <div className='border-b border-gray-300 flex items-start justify-center gap-4 w-full'>
                    <Image src={session.user.image} alt='user-img' width={40} height={40} className='rounded-full' />
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} type='text' placeholder='Whats happening ?' className='p-1 outline-none w-full' />
                </div>
                    {
                        selectedImage && (
                            <div className='max-h-[250px] w-full flex items-center justify-center'>
                                <Image src={imageFileUrl} alt='postImage' className='w-44 h-32 object-cover object-top p-1 rounded-2xl' width={40} height={40} />
                            </div>
                        )
                    }
                <div className='flex items-center justify-between p-2'>
                    <CiCirclePlus onClick={()=> imagePicRef.current.click()} className='text-4xl text-blue-600 hover:text-blue-800 hover:scale-105 transition duration-200 cursor-pointer' />
                    <input hidden type='file' ref={imagePicRef} accept='image/*' onChange={addImageToPost} />
                    <button disabled={text.trim() === '' || loading} onClick={handleSubmit} className='disbaled:bg-blue-200 bg-blue-400 text-white font-semibold rounded-full px-4 py-1 hover:scale-105 transition duration-200'>Post</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Input