import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import apiRequest from '../utils/apiRequest';
import '../App.css';
import { nanoid } from 'nanoid';  // Import nanoid
import { useSelector } from 'react-redux';
import blogCategories from '../utils/blogCategories';

const AddPost = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  const authData = useSelector((state)=>state.auth.userData)
  console.log('authdata from add post :',authData)
  const [file, setFile] = useState(null); // To store the selected file

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile); // Store the selected file
    } else {
      console.error('Invalid file type:', selectedFile);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    console.log('data',data)
    const formData = new FormData();
    formData.append('title', data.title); // Append title
    
    if (file) {
      const uniqueFileId = nanoid();  // Generate unique ID for the file
      formData.append('file', file);  // Append the selected file
    }

    formData.append('content', data.content); // Append TinyMCE content
    formData.append('category', data.category)
    formData.append('username', authData.username)
    formData.append('email', authData.email)
    formData.append('userId', authData.id)

    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Log each key-value pair
    }

    // Send the form data to your backend
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/upload', // Your endpoint to save the post
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        },
      });
      console.log('Response:', response);
      setFile(null)
      reset()
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className='min-h-screen bg-white shadow dark:bg-slate-900 text-white flex flex-col px-5 sm:px-10 justify-center items-center pt-[8vh] sm:pt-[10vh]'>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        {/* Title Field */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="border p-2 w-full rounded-md text-black"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            {...register('category', { required: 'category is required' })}
            className="border p-2 w-full text-black rounded-md"
          >
           {
            blogCategories && blogCategories.map((singleCategory)=>(
              <option key={nanoid()} value={singleCategory}>{singleCategory}</option>
            ))
           }
          </select>

          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className="file-upload-container">
          {/* Custom styled button */}
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hides default input
          />
        </div>

        {/* Image Preview */}
        {file && (
          <div className="image-preview">
            <img src={URL.createObjectURL(file)} alt="Image Preview" height='500px' width='600px' />
          </div>
        )}

        {/* TinyMCE Editor */}
        <div>
          <label htmlFor="content">Content</label>
          <Editor
            apiKey={apiKey}
            id="content"
            init={{
              height: 300,
              menubar: false,
              plugins: 'image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            }}
            onEditorChange={(content) => setValue('content', content)} // Store content in form state
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
