import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/apiRequest';
import { useAuth } from '../context/authContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const {setUser} = useAuth();

  const handleSubmit = async (e) => {
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await apiRequest.post('/auth/login', 
        {
          username,
          password
      })
  
      console.log(response)
      e.preventDefault()

      const {createdAt, updatedAt, ...user} = response.data.user

      console.log(user)

      setUser(user)

      navigate('/')

    } catch (error) {
      // For Axios, error responses are in error.response.data
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.log('Error message:', error.response.data.message);
        console.log('Status code:', error.response.status);
        setError(error.response.data.message);
      } else {
        // Network error or request was not made
        console.log('Error:', error.message);
        setError(error.message);
      }
    }
  }

  return (
    <>
      <div className="flex h-screen w-full justify-center">
        <div className="flex flex-col h-100 w-120 my-10 bg-amber-100 rounded-2xl shadow-2xl shadow-gray-500">

          <div className="flex-1 flex justify-center items-center">
            <div className="text-5xl text-gray-600 font-mono underline">Login</div>
          </div>

          <div className="flex-3 flex flex-col gap-4 items-center justify-center border-t-2 border-gray-400">
            <h1 className='text-4xl italic text-bold underline text-gray-600 font-mono'>Welcome {username}</h1>
            <input 
              type="text" 
              placeholder="username" 
              className="border-gray-400 border-2 py-2 px-5 rounded-2xl w-60 mt-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password" 
              className="border-gray-400 border-2 py-2 px-5 rounded-2xl w-60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button 
              className="border px-5 py-1 rounded-xl text-amber-700 text-lg cursor-pointer" 
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login