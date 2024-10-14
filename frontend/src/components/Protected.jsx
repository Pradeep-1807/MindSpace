import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({children, authentication=true}) => {

  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  useEffect(()=>{
    if (authentication && authStatus !== authentication){
      navigate('/')
    }
    if(!authentication && authStatus !== authentication){
      navigate('/posts')
    } 

  },[authStatus, authentication, navigate])

  return (
    <>
      {children}
    </>
  )
}

export default Protected
