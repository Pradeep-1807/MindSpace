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
    <section class="bg-white dark:bg-gray-900 pt-[8vh] sm:pt-[10vh] min-h-screen px-0 sm:px-20">
      {allPosts.length > 0 ? (
        allPosts.map((file) => {
          const imageUrl = `${BASE_URL}/file/${file._id}`;
          const { title, content, category, username, email } = file.metadata
          return (
            <div class="container px-6 py-10 mx-auto cursor-pointer">
                <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
                    <img class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={imageUrl} alt="Image" />

                    <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <p class="text-sm text-blue-500 uppercase">{category || 'Category'}</p>

                        <h3 href="#" class="block mt-4 text-2xl font-semibold text-gray-800  dark:text-white">
                            { title }
                        </h3>

                        <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            { content }
                        </p>


                        <div class="flex items-center mt-6">
                            <img class="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                            <div class="mx-4">
                                <h1 class="text-sm text-gray-700 dark:text-gray-200">{ username }</h1>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{ email }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
        })
      ) : (
        <section class="bg-white dark:bg-gray-900">
          <div class="container px-6 py-10 mx-auto animate-pulse">
              <h1 class="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

              <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

              <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  <div class="w-full ">
                      <div class="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                      
                      <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                      <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div class="w-full ">
                      <div class="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                      
                      <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                      <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div class="w-full ">
                      <div class="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                      
                      <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                      <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>
              </div>
          </div>
        </section>
      )}
        
    </section>
  );
};

export default Posts;

//category 
//author
//author description