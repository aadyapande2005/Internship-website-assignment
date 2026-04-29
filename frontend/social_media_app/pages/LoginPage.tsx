import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { apiRequest } from '../lib/apiRequest';
import { useAuth } from '../context/authContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const auth = useAuth();
  const setUser = auth?.setUser;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.preventDefault()
    if (isSubmitting) return

    console.log('Username:', username);
    console.log('Password:', password);
    setError('')
    setIsSubmitting(true)

    try {
      const response = await apiRequest.post('/auth/login', 
        {
          username,
          password
      })
  
      console.log(response)

      const {createdAt, updatedAt, ...user} = response.data.user

      console.log(user)

      setUser?.(user)

      navigate('/')

    } catch (error) {
      // For Axios, error responses are in error.response.data
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        // The server responded with a status code outside 2xx
        console.log('Error message:', axiosError.response.data?.message);
        console.log('Status code:', axiosError.response.status);
        setError(axiosError.response.data?.message || 'An error occurred');
      } else {
        // Network error or request was not made
        console.log('Error:', axiosError.message);
        setError(axiosError.message || 'An error occurred');
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-10">
        <div className="rise-in flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-amber-200/70 bg-amber-50/90 shadow-2xl shadow-amber-900/15">

          <div className="flex flex-1 items-center justify-center bg-linear-to-r from-orange-100 to-amber-200 px-6 py-8">
            <div className="display-title text-5xl text-amber-950">Welcome Back</div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 border-t border-amber-200 p-7">
            <h1 className='display-title text-3xl italic text-amber-900'>Ready to write, {username || 'author'}?</h1>
            <input 
              type="text" 
              placeholder="username" 
              className="mt-2 w-full rounded-2xl border border-amber-300 bg-white px-5 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password" 
              className="w-full rounded-2xl border border-amber-300 bg-white px-5 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button 
              className="pressable mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-amber-800 px-5 py-3 text-lg font-semibold text-amber-50 shadow-lg shadow-orange-300/40 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-70" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="loading-dot" />}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className="min-h-6 text-red-500">{error}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login