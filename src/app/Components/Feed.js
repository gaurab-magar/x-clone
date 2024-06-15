'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '@/Firebase';
import Post from './Post';

const Posts = () => {
  const [posts , setPosts] = useState([]);
  
  useEffect(()=>{
    const fetchPosts = async()=>{
      const db = getFirestore(app);

      const q = query(collection(db , 'posts'))
      const querySnapShot = await getDocs(q);
      let data = [];
      querySnapShot.forEach((doc)=>{
        data.push({id: doc.id , ...doc.data()});
      });
      setPosts(data);
    }
    fetchPosts();
  },[])
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p> // Message to show when no posts are available
      ) : (
            posts.map((post)=>(
                <Post key={post.id} post={post} />
            ))
        )
      }
    </div>
  )
}

export default Posts