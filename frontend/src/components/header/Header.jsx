import React, { useState } from 'react';
import navContent from '../../utils/navContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const authData = useSelector((state)=>state.auth.userData)

  function handleProfileClick(){
    setIsOpen((prev)=>!prev)
    navigate('/profile')
  }
  

  return (
    <nav className="fixed top-0 w-full bg-white shadow dark:bg-slate-800 z-50">
      <div className="container px-6 py-4 mx-auto ">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <h2 className='text-white text-lg sm:text-xl cursor-pointer' onClick={()=>navigate('/')}>
              {/* <img
                className="w-auto h-6 sm:h-7"
                src="https://merakiui.com/images/full-logo.svg"
                alt="Logo"
              /> */}
              <span className='text-xl sm:text-2xl'>M</span>ind<span className='text-xl sm:tex-2xl'>S</span>pace
            </h2>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen
                ? 'translate-x-0 opacity-100'
                : 'opacity-0 -translate-x-full'
            } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {
                navContent && navContent.map((current,index)=>(
                  <a
                    key={index}
                    onClick={()=>{
                      navigate(current.url)
                      setIsOpen((prev)=>!prev)
                    }}
                    className="px-3 py-2 mx-3 mt-2 text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {current.name}
                  </a>
                ))
              }
              

            </div>

            <div className="flex items-center mt-4 lg:mt-0" onClick={handleProfileClick}>
              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <div className="w-8 h-8 overflow-hidden rounded-full" >
                  <img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Light"
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                  {authData?.username}
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
