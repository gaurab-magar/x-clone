'use client'
import Link from 'next/link';
import React, { useEffect , useState } from 'react'

const News = () => {
  const [news , setNews] = useState([]);
  const [articleNum , setArticleNum] = useState(3);

  useEffect(()=>{
    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`)
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data.articles)
      setNews(data.articles)
    })
  },[])

  return (
    <div className='border h-screen'>
      {news.slice(0,articleNum).map((article)=>
      (
        <div key={article.url}>
          
          <p>{article.title}</p>
        </div>
      )
      )}
    </div>
  )
}
export default News

