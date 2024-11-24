import React, { useState } from 'react'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePostConfirmation from './DeletePostConfirmation';
import stripHtml from '../../utils/stripHtml';
import { useSelector } from 'react-redux';
import InfoAlert from '../alerts/InfoAlert';
import timeFormatter from '../../utils/timeFormatter'

const SinglePostCard = ({ postId, imageUrl, category, title, content, username, email, setAllPosts}) => {

    const [ isDeletePostConfirmationVisible, setIsDeletePostConfirmationVisible ] = useState(false)

    const authData = useSelector((state)=>state.auth.userData)
    const alertDetails = useSelector((state)=> state.alert)
    const navigate = useNavigate()

    const deleteIconStyle = ((authData?.username === username) && (authData.email === email)) ? 'block' : 'hidden'
    

    function handlePostNavigate(id){
        navigate(`/post/${id}`)
    }

    function handleDeletePostIconClick(){
        setIsDeletePostConfirmationVisible((prev)=>!prev)
    }
      
    
    const slicedContent = stripHtml(content).slice(0, 300) + (content.length > 300 ? '...' : '');
    
    

  return (
    <div className="container px-3 sm:px-6 py-4 sm:py-7 mx-auto relative border-2 border-sky-900 rounded-md mt-5 overflow-x-scroll sm:overflow-x-auto" >
        <div className="mt-0 lg:-mx-6 lg:flex lg:items-center ">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96 cursor-pointer" 
                    src={imageUrl} 
                    alt="Image" 
                    onClick={()=>handlePostNavigate(postId)} />

            <div className=" lg:w-1/2 mt-4 lg:mx-6 relative">
                <p className="text-sm text-blue-500 uppercase">{category || 'Category'}</p>

                <h3 href="#" className="block mt-4 text-2xl font-semibold text-gray-800  dark:text-white">
                    { title }
                </h3>

                <span className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    { parse(slicedContent) } { content.length>250 && <a className='text-blue-700 underline cursor-pointer' onClick={()=>handlePostNavigate(postId)}>Read More</a>}
                </span>

                <p>{}</p>


                <div className="flex items-center mt-12">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Light" alt="" />

                    <div className="mx-4">
                        <h1 className="text-sm text-gray-700 dark:text-gray-200">{ username }</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{ email }</p>
                    </div>
                </div>

                <div className={`${deleteIconStyle} absolute right-1 bottom-4 sm:bottom-1  p-[2px] sm:p-1 bg-slate-600 hover:bg-slate-800 rounded-lg cursor-pointer`} onClick={handleDeletePostIconClick}>
                    <DeleteIcon sx={{color:'red'}} />
                </div>
            </div>
            
        </div>
        <DeletePostConfirmation  isDeletePostConfirmationVisible={isDeletePostConfirmationVisible} setIsDeletePostConfirmationVisible={setIsDeletePostConfirmationVisible} postId={postId} setAllPosts={setAllPosts}/>
        <InfoAlert isVisible={alertDetails.status} title={alertDetails.title} message={alertDetails.message} />
    </div>
  )
}

export default SinglePostCard
