import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiRequest from '../utils/apiRequest'
import indianTimeFormatter from '../utils/timeFormatter'

const SinglePostDetails = () => {

  const [ postDetails, setPostDetails ] = useState(null)

  const { postId } = useParams()

  async function getPostDetails(){
    const response = await apiRequest({
      method: 'GET',
      url: `/postDetails/${postId}`
    })
    console.log('response :',response)
    console.log(indianTimeFormatter(response.post.uploadDate))
  }

  useEffect(()=>{
    getPostDetails()
  },[])

  return (
    <div className='h-screen w-screen bg-white dark:bg-gray-900'>
      
    </div>
  )
}

export default SinglePostDetails
