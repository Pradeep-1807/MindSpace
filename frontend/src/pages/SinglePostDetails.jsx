import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiRequest from '../utils/apiRequest'
import indianTimeFormatter from '../utils/timeFormatter'
import parse from 'html-react-parser'

const SinglePostDetails = () => {

  const [ postDetails, setPostDetails ] = useState({})
  const [ loading, setLoading ] = useState(true)

  const { postId } = useParams()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function getPostDetails(){
    const response = await apiRequest({
      method: 'GET',
      url: `/postDetails/${postId}`
    })
    setPostDetails(response.post)
  }

  if (!postDetails) {
    return <p className='text-xl text-white text-center'>Loading...</p>

  }

  useEffect(()=>{
    getPostDetails()
  },[])


  const metadata = postDetails?.metadata || {};
  const { title, email, content, category, username } = metadata;
  const postUploadDate = postDetails.uploadDate && indianTimeFormatter(postDetails.uploadDate)

  const imageUrl = `${BASE_URL}/streamPost/${postDetails?._id}`



  return (
    <div className='min-h-screen max-w-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center pb-5 sm:pb-10 pt-[8vh] sm:pt-[10vh] px-2'>
      <div className="w-full h-auto mt-5 pb-5  sm:max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 border-2 border-sky-900  relative">
          <img className="object-cover w-full h-64" src={imageUrl} alt="" />

          <div className="p-6 mt-5 sm:mt-8">
              <div>
                  <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{category}</span>
                  <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">{title}</a>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">{content && parse(String(content))}</span>
              </div>

              <div className="mt-5 sm:mt-10">
                  <div className="flex items-center flex-wrap">
                      <div className="flex items-center">
                          <img className="object-cover h-10 rounded-full" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Light" alt="Avatar" />
                          <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" tabIndex="0" role="link">{username}</a>
                      </div>
                      <span className="mx-1 text-xs text-gray-600 dark:text-gray-300 absolute bottom-2 right-2">{postUploadDate}</span>
                  </div>
                  <p className="text-sm ml-12 -mt-2 text-gray-500 dark:text-gray-400">{ email }</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default SinglePostDetails
