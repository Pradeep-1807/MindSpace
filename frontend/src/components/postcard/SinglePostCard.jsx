import React, { useState } from 'react'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePostConfirmation from './DeletePostConfirmation';

const SinglePostCard = ({ postId, imageUrl, category, title, content, username, email}) => {

    const [ isDeletePostConfirmationVisible, setIsDeletePostConfirmationVisible ] = useState(false)

    const navigate = useNavigate()

    function handlePostNavigate(id){
        navigate(`/post/${id}`)
    }

    function handleDeletePostIconClick(){
        setIsDeletePostConfirmationVisible((prev)=>!prev)
    }


    const stripHtml = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };
    
    // Strip HTML tags, slice to 250 characters, and add ellipsis
    const slicedContent = stripHtml(content).slice(0, 300) + (content.length > 300 ? '...' : '');

  return (
    <div className="container px-6 py-10 mx-auto cursor-pointer"  >
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={imageUrl} alt="Image" />

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 relative">
                <p className="text-sm text-blue-500 uppercase">{category || 'Category'}</p>

                <h3 href="#" className="block mt-4 text-2xl font-semibold text-gray-800  dark:text-white">
                    { title }
                </h3>

                <span className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    { parse(slicedContent) } { content.length>250 && <a className='text-blue-700 underline' onClick={()=>handlePostNavigate(postId)}>Read More</a>}
                </span>


                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                    <div className="mx-4">
                        <h1 className="text-sm text-gray-700 dark:text-gray-200">{ username }</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{ email }</p>
                    </div>
                </div>

                <div className='absolute right-1  p-1 sm:p-2 bg-slate-600 hover:bg-slate-800 rounded-lg' onClick={handleDeletePostIconClick}>
                    <DeleteIcon sx={{color:'red'}} />
                </div>
            </div>
            
        </div>
        <DeletePostConfirmation isVisible={isDeletePostConfirmationVisible} setIsVisible={setIsDeletePostConfirmationVisible} postId={postId} />
    </div>
  )
}

export default SinglePostCard
