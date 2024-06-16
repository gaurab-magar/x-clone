'use client'
import React, { useEffect, useState } from 'react';
import { app } from '@/Firebase';
import { collection, getFirestore, onSnapshot, orderBy } from 'firebase/firestore';
import Comment from './Comment';


const Comments = ({id}) => {
    const db = getFirestore(app);
    const [comments, setComments] = useState([]);

    useEffect(()=>{
         onSnapshot(
            quary(
                collection(db,'posts',id,'comments'),
                orderBy('timestamp','desc')
            ),
            (snapshot)=>{
                setComments(snapshot.docs);
                }
         )
    },[db,id])
  return (
    <div>
        {comments.map((comment)=>{
            <Comment key={comment.id} comment={comment.data} id={comment.id}/>
        })}
    </div>
  )
}

export default Comments