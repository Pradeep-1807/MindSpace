import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiRequest from '../utils/apiRequest'

const Posts = () => {

  const [ allPosts, setAllPosts ] = useState([])
  const authStatus = useSelector((state)=> state.auth.status)
  console.log( 'auth Status from posts :: ',authStatus)

  const getPosts = async()=>{
    const response = await apiRequest({
      method: 'GET',
      url: '/posts'
    })
    if (response){
      setAllPosts(response)
    }
    
    console.log('post response',response)
  }
  
  useEffect(()=>{
    getPosts()
  },[])

  return (
    <div className='h-screen w-screen bg-black'>
      {
        allPosts.posts && <h1 className='text-white text-lg'>{allPosts.message}</h1>
      }
    </div>
  )
}

export default Posts
