import React from 'react'
import apiRequest from '../utils/apiRequest'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

const ConfirmLogout = ({isVisible, setIsVisible}) => {

    const dispatch = useDispatch()

    async function handleLogoutConfirmationClick() {
        const isLoggedOut = await apiRequest({
            method:'GET',
            url:'/logout',
        })
        if (isLoggedOut.status){
            localStorage.clear();
            dispatch(logout())
        }
    }

    if (!isVisible){
        return
    }
  return (
    <section className="bg-white dark:bg-gray-900 h-auto w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg  border-2 border-blue-900">
        <div className="container flex flex-col items-center px-2 py-12  text-center">
            <p className="block text-lg  sm:text-2xl font-semibold px-5 sm:px-10 max-w-4xl mt-4 text-gray-500 dark:text-gray-300">
                Do you want to Logout?
            </p>
 
            <div className="mt-6">
                <button onClick={()=>setIsVisible(false)} 
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    <span className="mx-2">
                        Cancel
                    </span>
                </button>

                <button onClick={handleLogoutConfirmationClick}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 mt-4 overflow-hidden text-sm text-white transition-colors duration-300 bg-red-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-red-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    <span className="mx-2">
                        Logout
                    </span>
                </button>
            </div>
        </div>
    </section>
  )
}

export default ConfirmLogout
