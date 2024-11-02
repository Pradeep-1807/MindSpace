import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiRequest from '../utils/apiRequest'

const Posts = () => {

  const [ allPosts, setAllPosts ] = useState([])
  const authStatus = useSelector((state)=> state.auth.status)
  console.log( 'auth Status from posts :: ',authStatus)

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const getPosts = async()=>{
    const response = await apiRequest({
      method: 'GET',
      url: '/getPosts'
    })
    if (response && Array.isArray(response.files)) {
      setAllPosts(response.files);
    } else {
      setAllPosts([]); // Fallback to empty array if response is not valid
    }
    
  }
  useEffect(() => {
    console.log('All posts after fetch:', allPosts); // Log posts to inspect data
  }, [allPosts]);
  
  useEffect(()=>{
    getPosts()
  },[])

  console.log('allposts ', allPosts)

  return (
    <div className="h-screen w-screen flex flex-col gap-10 ">
      {allPosts.length > 0 ? (
        allPosts.map((file) => (
          <div key={file._id} className="flex justify-center border h-[500px] w-auto border-solid border-black">
            {/* Use the /file/:id endpoint to render images */}
            <img
              src={`${BASE_URL}/file/${file._id}`} // Construct URL to get the image data
              alt={file.filename || 'Image'}
              className="h-full w-full"
            />
          </div>
        ))
      ) 
      : (
        <p className="text-black text-center">No images to display</p>
      )
      }
    </div>
  );
}

export default Posts
