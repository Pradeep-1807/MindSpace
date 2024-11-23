import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { json, useNavigate } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import SinglePostCard from '../components/postcard/SinglePostCard';
import FailureAlert from '../components/alerts/FailureAlert';
import { all } from 'axios';

const Posts = () => {

  const [allPosts, setAllPosts] = useState(()=>{
    const posts = localStorage.getItem('allPosts')
    console.log('inside usestate fetching allPosts')
    if (posts) console.log('posts are present')
    return posts!=null ? JSON.parse(posts) : []
  });
  const authData = useSelector((state)=>state.auth.userData)
  

  const dispatch = useDispatch()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const getPosts = async () => {
    if (!allPosts || allPosts.length === 0){
      try {
        console.log('getPosts in execution')
        const response = await apiRequest({
          method: 'GET',
          url: '/getPosts',
        });
        if (response && Array.isArray(response.files)) {
          setAllPosts(response.files);
          (localStorage.setItem('allPosts',JSON.stringify(response.files)))
          if (authData) {
            const { username, email, id, exp, iat} = authData
            const postCount = response.files?.reduce((acc, cur) => {
              if (cur.metadata.email === email && cur.metadata.username === username) {
                console.log('+1')
                acc += 1;
              }
              return acc;
            }, 0);
          
            const userData = { id, username, email, postCount, iat, exp }
            dispatch(login(userData));
            
          }
  
        } else {
          setAllPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAllPosts([]);
      }
    }
    
    // console.log('post collection : ',allPosts)

  };

  

  useEffect(() => {
    getPosts();
  }, []);

  
  return (
    <section className="bg-white dark:bg-gray-900 pt-[8vh] sm:pt-[10vh] min-h-screen px-0 sm:px-20">
      {allPosts && allPosts.length > 0 ? (
        allPosts.map((file) => {
          const imageUrl = `${BASE_URL}/streamPost/${file._id}`;
          
          const { title, content, category, username, email } = file.metadata


          return (

            <SinglePostCard 
              key={file?._id}
              postId={file?._id}
              imageUrl={imageUrl}
              category={category}
              title={title}
              content={content}
              username={username}
              email={email}
              setAllPosts={setAllPosts}
            />
            
          );
        })
      ) : (
        <div className='h-screen flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      )}
        
    </section>
    
  );
};

export default Posts;

//category 
//author
//author description