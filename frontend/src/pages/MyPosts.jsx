import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SinglePostCard from '../components/postcard/SinglePostCard'
import apiRequest from '../utils/apiRequest'

const MyPosts = () => {

    const [ myPosts, setMyPosts ] = useState([])
    const authData = useSelector((state)=>state.auth.userData)
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.log('authdata from MyPosts',authData)

    async function getPostsById(){
        try {
          const response = await apiRequest({
              method:'GET',
              url:`/getPosts/${authData.id}`
          })

          if (response && Array.isArray(response.files)){
              setMyPosts(response.files)
              console.log('response files for mypost :',response.files)
          }
        } catch (error) {
          console.log('MyPosts ::  getPostsById ::',error)
        }
    }

    useEffect(() => {
        if (authData && authData.id) {
          getPostsById();
        }
      }, [authData]);


  return (
    <section className="bg-white dark:bg-gray-900 pt-[8vh] sm:pt-[10vh] min-h-screen px-2 sm:px-20">
      {
        myPosts && myPosts.length > 0 ?
        myPosts.map((singlePost)=>{
          const imageUrl = `${BASE_URL}/streamPost/${singlePost._id}`;
          const { title, content, category, username, email } = singlePost.metadata

          return (
            <SinglePostCard 
              key={singlePost._id}
              postId={singlePost._id}
              imageUrl={imageUrl}
              category={category}
              title={title}
              content={content}
              username={username}
              email={email}
            />
          )
        })
        :(
        <div className='h-screen flex flex-col gap-10 justify-center items-center'>
          <div className="loader-nocontent"></div>
          <h2 className='text-xl text-white font-semibold'>No Posts yet</h2>
        </div>
        )
      }
        
    </section>
  )
}

export default MyPosts
