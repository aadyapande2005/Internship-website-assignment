import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='flex-2 flex items-center h-20 border-amber-50 rounded bg-amber-300 ml-2 my-2 shadow-blue-900 shadow-lg'>
        <Link to={'/'}>
        <h1 className='text-5xl text-neutral-500 italic underline ml-10'>Social</h1>
        </Link>
      </div>
    </>
  )
}

export default Navbar