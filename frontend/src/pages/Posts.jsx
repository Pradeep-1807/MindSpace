import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiRequest from '../utils/apiRequest';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col gap-10">
      {allPosts.length > 0 ? (
        allPosts.map((file) => {
          const imageUrl = `${BASE_URL}/file/${file._id}`;
          console.log("Attempting to load image from:", imageUrl);
          return (
            <div key={file._id} className="flex justify-center border h-[500px] w-auto border-solid border-black">
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
        <p className="text-black text-center">No images to display</p>
      )}
    </div>
  );
};

export default Posts;
