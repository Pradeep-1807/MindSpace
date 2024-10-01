import React from 'react'

const Protected = ({children, authentication=true}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
