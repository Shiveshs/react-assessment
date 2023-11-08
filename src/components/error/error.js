import React from 'react'
import "./error.css"

const Error = ({errorMessage}) => {
  return (
    <div className='error'>{errorMessage}</div>
  )
}

export default Error