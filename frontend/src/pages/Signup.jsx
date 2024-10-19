import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import apiRequest from '../utils/apiRequest'
import bcrypt from 'bcryptjs'

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState:{errors}} = useForm()
    const password = watch("password");

    async function signupSubmit(data){
        const {password, confirmPassword} = data
        
        try {
            // if (password===confirmPassword){
            //     data.confirmPassword = null
            //     data.password = await bcrypt.hash(data.password, 10)
            //     console.log(data.password)
            // }
            const response = await apiRequest({
                method:'POST',
                url:'/register',
                data
            })
            console.log("User registered successfully :: ",response)
            navigate('/')
        } catch (error) {
            console.log('signupSubmit :: ',error.response)
        }
    }

  return (
    <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-[92vh] sm:min-h-[90vh] px-6 mx-auto ">
            <form 
                onSubmit={handleSubmit(signupSubmit)}
                noValidate
                className="w-full max-w-md px-5 sm:px-10 py-7 border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">

                <h1 className="mt-3 text-2xl text-center  text-gray-800 capitalize sm:text-3xl dark:text-white">Signup</h1>

                <div className="relative flex items-center mt-8">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    </span>
                    <input
                    {...register('username',{
                        required:"Username is required"
                    })}
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Username"
                    />
                </div>
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}


                <div className="relative flex items-center mt-6">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    </span>
                    <input
                    {...register('email',{
                        required:'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                        }
                    })}
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    />
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    </span>
                    <input
                    {...register('password',{
                        required:'Password is required',
                        minLength: { value: 3, message: 'Password must be at least 3 characters long' },
                    })}
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    />
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}


                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    </span>
                    <input
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Confirm Password"
                    />
                </div>
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                    </button>

                    <div className="mt-6 text-center ">
                        <h5 className='text-white'>
                        Already have an account?
                        <span onClick={()=>{navigate('/')}} className="ml-1 text-md cursor-pointer text-blue-500 hover:underline dark:text-blue-400">
                            Login
                        </span>
                        </h5>
                    </div>
                </div>
            </form>
        </div>
    </section>

  )
}

export default Signup
