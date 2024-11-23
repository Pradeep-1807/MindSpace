import React from 'react'
import apiRequest from '../../utils/apiRequest'
import { useSelector, useDispatch } from 'react-redux'
import { createAlert, deleteAlert } from '../../store/alertSlice'
import FailureAlert from '../alerts/FailureAlert'

const DeletePostConfirmation = ({isDeletePostConfirmationVisible, setIsDeletePostConfirmationVisible, postId, setAllPosts}) => {

    const authData = useSelector((state)=>state.auth.userData)
    const alertDetails = useSelector((state)=>state.alert)
    const dispatch = useDispatch()

    async function handleDeletePostConfirmationClick(postId){
        try {
            const isPostDeleted = await apiRequest({
                method:'POST',
                url:`/deletePost/${postId}`,
                data:authData
            })
            if (isPostDeleted && isPostDeleted.status){
                setIsDeletePostConfirmationVisible(false)
                console.log('Post Deleted Successfully')
            }
            const allPosts = JSON.parse(localStorage.getItem('allPosts'))
            const filteredAllPosts = allPosts?.filter((singlePost)=>(
                singlePost._id !== postId
            ))
            setAllPosts(filteredAllPosts)
            localStorage.setItem('allPosts',JSON.stringify(filteredAllPosts))

            const alertObject = {
                status: true,
                title: 'Deleted',
                message: isPostDeleted?.message
            }
            console.log('alertObject from delete confirmation :', alertObject)
            dispatch(createAlert(alertObject))
            setTimeout(() => {
            dispatch(deleteAlert())
            }, 3000);
            console.log('alertDetails after delete alert :',alertDetails)
        } catch (error) {
            throw new error
        }
 
    }

    if (!isDeletePostConfirmationVisible) return 

  return (
    <section className="bg-white dark:bg-gray-900 h-auto w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg  border-2 border-blue-900">
        <div className="container flex flex-col items-center px-2 py-12 mx-auto text-center">
            <p className="block text-lg  sm:text-2xl font-semibold px-5 sm:px-10 max-w-4xl mt-4 text-gray-500 dark:text-gray-300">
                Do you want to Delete this post?
            </p>
 
            <div className="mt-6">
                <button onClick={()=>setIsDeletePostConfirmationVisible((prev)=>!prev)} 
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    <span className="mx-2">
                        Cancel
                    </span>
                </button>

                <button onClick={()=>handleDeletePostConfirmationClick(postId)}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 mt-4 overflow-hidden text-sm text-white transition-colors duration-300 bg-red-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-red-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    <span className="mx-2">
                        Delete
                    </span>
                </button>
            </div>
        </div>
    </section>
  )
}

export default DeletePostConfirmation
