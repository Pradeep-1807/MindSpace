import React from 'react'
import { useSelector } from 'react-redux'

const Posts = () => {
  const authStatus = useSelector((state)=> state.auth.status)
  console.log( 'auth Status from posts :: ',authStatus)

  return (
    <div className='h-screen w-screen bg-black'>
      
    </div>
  )
}

export default Posts
