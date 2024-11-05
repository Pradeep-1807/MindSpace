import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import parse from 'html-react-parser'
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
    <section className="bg-white dark:bg-gray-900 pt-[8vh] sm:pt-[10vh] min-h-screen px-0 sm:px-20">
      {allPosts.length > 0 ? (
        allPosts.map((file) => {
          const imageUrl = `${BASE_URL}/file/${file._id}`;
          const { title, content, category, username, email } = file.metadata
          return (
            <div className="container px-6 py-10 mx-auto cursor-pointer" key={file._id} onClick={()=>handlePostNavigate(file._id)}>
                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={imageUrl} alt="Image" />

                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <p className="text-sm text-blue-500 uppercase">{category || 'Category'}</p>

                        <h3 href="#" className="block mt-4 text-2xl font-semibold text-gray-800  dark:text-white">
                            { title }
                        </h3>

                        <span className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            { parse(content) }
                        </span>


                        <div className="flex items-center mt-6">
                            <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700 dark:text-gray-200">{ username }</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{ email }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
        })
      ) : (
        <div className=" pt-[8vh] sm:pt-[10vh] flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
          <div className="w-2/3 bg-gray-300 dark:bg-gray-600"></div>

          <div className="w-2/3 h-[500px] p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

              <div className="flex mt-4 item-center gap-x-2">
                  <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                  <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                  <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700"></div>
              </div>
          </div>
        </div>
      )}
        
    </section>
  );
};

export default Posts;

//category 
//author
//author description