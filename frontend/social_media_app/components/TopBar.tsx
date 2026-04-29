import Navbar from './Navbar'
import User from './User'
import { useAuth } from '../context/authContext'

function TopBar() {
  const auth = useAuth();
  const user = auth?.user ?? null
  
  return (
    <>
      <div className='sticky top-0 z-20 px-3 pt-3 backdrop-blur-sm'>
        <div className='rise-in flex items-center gap-2'>
        <Navbar />        
        <User user={user}  />        
        </div>
      </div>
    </>
  )
}

export default TopBar