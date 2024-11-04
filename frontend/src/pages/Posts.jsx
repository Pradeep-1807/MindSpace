import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { all } from 'axios';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getPosts = async () => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/getPosts',
      });
      if (response && Array.isArray(response.files)) {
        setAllPosts(response.files);
      } else {
        setAllPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllPosts([]);
    }
  };

  function handlePostNavigate(id){
    navigate(`/post/${id}`)
  }

  console.log('post collection : ',allPosts)

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col gap-10 pt-[8vh] sm:pt-[10vh]">
      {allPosts.length > 0 ? (
        allPosts.map((file) => {
          const imageUrl = `${BASE_URL}/file/${file._id}`;
          return (
            <div key={file._id} onClick={()=>handlePostNavigate(file._id)} className="flex justify-center border h-[500px] w-auto border-solid border-black cursor-pointer">
              <img
                src={imageUrl}
                alt={file.filename || 'Image'}
                className="h-full w-full"
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.target.alt = "Image failed to load";
                }}
              />
            </div>
          );
        })
      ) : (
        <p className="text-black text-center">Loading...</p>
      )}
    </div>
  );
};

export default Posts;
