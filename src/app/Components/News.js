'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect , useState } from 'react'

const News = () => {
  const [news , setNews] = useState([]);
  const [articleNum , setArticleNum] = useState(3);

  useEffect(()=>{
    fetch(`${process.env.API_URL}`)
    .then((res)=> res.json())
    .then((data)=>{
    setNews(data.articles)
    })
  },[])

  return (
    <div className='h-screen'>
      <div>
        <h2 className='text-gray-700 w-full my-2 p-2 font-bold text-xl'>Whats happening</h2>
      </div>
      {news.slice(0,articleNum).map((article)=>
      (
        <div key={article.url} >
          <Link href={article.url} target='_blank'>
          <div className='flex items-center p-3 my-2 hover:bg-gray-200 transition duration-200  border-b shadow-md gap-2'>
            <div>
              <h2 className='font-semibold text-gray-700 text-sm'>{article.title}</h2> 
              <p className='text-xs font-medium text-gray-500'>{article.source.name}</p>
            </div>
            <Image src={article.urlToImage} alt={article.title} width={80} height={80} className='rounded-full object-fill object-center'/>
          </div>
          </Link>
        </div>
      )
      )}
      <div className='flex items-center justify-between'>
        <button onClick={()=> setArticleNum(articleNum - 3)} className='hover:text-blue-500 transition-all duration-200 rounded-md p-2 font-light text-blue-400 text-start'>Show Less</button>
        <button onClick={()=> setArticleNum(articleNum + 3)} className='hover:text-blue-500 transition-all duration-200 rounded-md p-2 font-light text-blue-400 text-start'>load more</button>
      </div>
    </div>
  )
}
export default News

