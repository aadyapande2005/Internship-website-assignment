import type UserData from "../interfaces/userInterface";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";
import { useAuth } from "../context/authContext";


function User({user}: UserData | null) {
  const navigate = useNavigate();

  const {setUser} = useAuth()

  const handlelogout = async () => {
    try {
      await apiRequest.get('/auth/logout')
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log(error?.response.data)
      navigate('/login')
    }
  }
  return (
    <>
      { user ?
        <div>
        <div className='hidden flex-1 md:flex items-center gap-2 h-20 border-amber-50 rounded bg-amber-300 mr-2 my-2 p-2 shadow-blue-900 shadow-lg'>        
          <div className='flex gap-2 items-center flex-2 px-5'>
            <img src="./public/default.jpg" alt="profile-img" className='h-12 aspect-square rounded-full shadow-md shadow-gray-500' />
            <div className='text-3xl text-blue-500 font-bold p-4 '>
              {user.username}          
            </div>
          </div>
          <button 
            className='bg-blue-300 text-red-500 font-bold border-amber-50 rounded-2xl p-2 shadow-gray-500
          shadow-md cursor-pointer'
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
        <img src={user?.avatar || "./default.jpg"} alt="profile-img" className='md:hidden h-12 aspect-square rounded-full shadow-md shadow-gray-500 mr-2' />
      </div>
      : <div className='flex items-center gap-5 h-20 border-amber-50 rounded bg-amber-300 mr-2 my-2 p-2 shadow-blue-900 shadow-lg'>
        <Link to={'/login'}>
          <button className='bg-blue-300 text-red-500 font-bold border-amber-50 rounded-2xl p-2 shadow-gray-500
            shadow-md cursor-pointer mx-3'>Sign in</button>        
        </Link>
        <Link to={'/register'}>
          <button className='bg-blue-300 text-red-500 font-bold border-amber-50 rounded-2xl p-2 shadow-gray-500
            shadow-md cursor-pointer mx-3'>Register</button>
        </Link>
      </div>
      }
    </>
  )
}

export default User;