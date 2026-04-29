import type UserData from "../interfaces/userInterface";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { apiRequest } from "../lib/apiRequest";
import { useAuth } from "../context/authContext";

interface UserProps {
  user: UserData | null
}

function User({user}: UserProps) {
  const navigate = useNavigate();

  const auth = useAuth();
  const setUser = auth?.setUser

  const handlelogout = async () => {
    try {
      await apiRequest.get('/auth/logout')
      setUser?.(null)
      navigate('/')
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log(axiosError?.response?.data)
      navigate('/login')
    }
  }
  return (
    <>
      { user ?
        <div className='ml-auto'>
        <div className='hidden h-20 items-center gap-2 rounded-2xl border border-amber-200/70 bg-amber-50/90 p-2 shadow-xl shadow-amber-900/10 md:flex'>        
          <div className='flex items-center gap-2 px-3'>            
            <Link to={'/profile'}>
              <div className='flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-orange-100 text-lg font-bold text-amber-900'>
              {(user.username || 'U').slice(0, 1).toUpperCase()}
            </div>
            </Link>
          </div>
          <button 
            className='cursor-pointer rounded-2xl border border-amber-700 bg-amber-800 px-4 py-2 font-semibold text-amber-50 shadow-md shadow-orange-300/40 transition hover:bg-amber-900'
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
        {/* <Link to={'/profile'}>
          <div className='mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-orange-100 text-lg font-bold text-amber-900 shadow-md md:hidden'>
            {(user.username || 'U').slice(0, 1).toUpperCase()}
          </div>
        </Link> */}
      </div>
      : <div className='ml-auto mr-2 flex h-20 items-center gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/90 p-2 shadow-xl shadow-amber-900/10'>
        <Link to={'/login'}>
          <button className='mx-1 cursor-pointer rounded-2xl border border-orange-200 bg-orange-100 px-4 py-2 font-semibold text-amber-900 shadow-md'>Sign in</button>        
        </Link>
        <Link to={'/register'}>
          <button className='mx-1 cursor-pointer rounded-2xl border border-amber-700 bg-amber-800 px-4 py-2 font-semibold text-amber-50 shadow-md shadow-orange-300/45'>Register</button>
        </Link>
      </div>
      }
    </>
  )
}

export default User;