'use client'
import React, { useEffect, useState } from 'react';
import { app } from '@/Firebase';
import Comment from './Comment';
import { collection,getFirestore,onSnapshot, query } from 'firebase/firestore';


const Comments = ({id}) => {
    const db = getFirestore(app);
    const [comments, setComments] = useState([]);
    console.log(comments)

    useEffect(()=>{
         onSnapshot(
           query(
                collection(db,'posts',id,'comments')
            ),
            (snapshot)=>{
                setComments(snapshot.docs);
                }
         ) 
    },[db,id])
  return (
    <div>
        {comments.map((comment)=>(
          <Comment key={comment.id} comment={comment.data()} commentId={comment.id} postId={id} />
        )
        )}
    </div>
  )
}

export default Comments