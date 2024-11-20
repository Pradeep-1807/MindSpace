import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import backgroundImg from '../assets/backgroundImg.jpg'
import apiRequest from '../utils/apiRequest';
import SuccessAlert from '../components/alerts/SuccessAlert';
import FailureAlert from '../components/alerts/FailureAlert';
import bcrypt from 'bcryptjs'
import { useForm } from 'react-hook-form'
import { createAlert, deleteAlert } from '../store/alertSlice';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState:{errors}, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const authStatus = useSelector((state)=> state.auth.status)
  console.log( 'auth Status from home :: ',authStatus)

  async function loginSubmit(data){
    try {
      console.log(data.password)
      const response = await apiRequest({
          method:'POST',
          url:'/login',
          data
      })
      console.log("User logged in successfully :: ",response)
      if (response.status){
        const alertObject = {
          status: true,
          title: 'Success',
          message: response.message
        }
        dispatch(createAlert(alertObject))
        setTimeout(() => {
          dispatch(deleteAlert())
          dispatch(login(response.user))
          navigate('/posts')
        }, 2000);
      }
      

    } catch (error) {
        const alertObject = {
          status:false,
          title: 'Failed',
          message: error.response.data.message
        }
        dispatch(createAlert(alertObject))
        setTimeout(() => {
            dispatch(deleteAlert())
        }, 3000);
        reset()
        console.log('loginSubmit :: ',error.response)
    }
  }

  const verifyToken = async () => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/verifyTokenAtHome',   
      });

      if (response.message === 'Token is valid') {
        dispatch(login(response.user))
        console.log('user info from jwt ::',response.user)
        navigate('/posts');  
      }
    } catch (error) {
      console.log('Token invalid or not present');
    }
  };


  useEffect(() => {
    verifyToken();  
  }, []);

  const alertDetails = useSelector((state)=> state.alert)

  return (
    <section className="bg-white dark:bg-gray-900 pt-[8vh] sm:pt-[10vh] " 
    style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
      

      <div className="container  px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto ">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl ">
            MindSpace
          </h1>

          <p className="mt-6 text-gray-500 dark:text-gray-300">
          Welcome to MindSpace, where we share insights, tips, and stories on technology, lifestyle, and creativity. Explore and stay inspired with our latest updates!
          </p>

          <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
            
            <form onSubmit={handleSubmit(loginSubmit)} noValidate className="w-full max-w-md px-5 sm:px-10 py-7" >
              
              <h1 className="mt-3 text-2xl  text-gray-800 capitalize sm:text-3xl dark:text-white">Login</h1>
              <div className="relative flex items-center mt-8">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                  </span>

                  <input 
                    {...register('email', {
                      required:'Email is required',
                      pattern:{
                        value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message:'Invalid Email format'
                      }
                      })}
                    type="email" 
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    placeholder="Email address" />
              </div>
              <p className='text-red-600 text-start mt-2'> {errors?.email?.message}</p>

              <div className="relative flex items-center mt-4">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </span>

                  <input 
                    {...register('password')}
                    type="password"  
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                    placeholder="Password" />
              </div>

              <div className="mt-6">
                  <button
                    type='submit' 
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Login
                  </button>

                

                  <div className="mt-6 text-center ">
                    <h5 className='text-white'>
                      Don’t have an account yet? 
                      <span onClick={()=>{navigate('/signup')}} className="ml-1 text-md cursor-pointer text-blue-500 hover:underline dark:text-blue-400">
                          Signup
                      </span>
                    </h5>
                  </div>

              </div>
            </form>
          </div>

        </div>
      </div>

      <SuccessAlert isVisible={alertDetails && alertDetails.status} title={alertDetails.title} message={alertDetails.message} />
      <FailureAlert isVisible={alertDetails.title && !alertDetails.status} title={alertDetails.title} message={alertDetails.message} />
    </section>
  );
};

export default Home;
