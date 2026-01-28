import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import TopBar from '../components/TopBar';

function Protected() {
  const {user} = useAuth();

  return (
    <>
    {
      user ? 
      <div className='min-h-screen bg-blue-300 flex flex-col'>
        <TopBar />
        <Outlet />
        <footer className='bg-blue-400 h-30'>          
        </footer>
      </div> 
      : 
      <div>Cannot access</div>
    }      
    </>
  )
}

export default Protected