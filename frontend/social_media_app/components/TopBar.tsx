import Navbar from './Navbar'
import User from './User'
import { useAuth } from '../context/authContext'

function TopBar() {
  const {user} = useAuth()
  
  return (
    <>
      <div className='flex items-center gap-2'>
        <Navbar />        
        <User user={user}  />        
      </div>
    </>
  )
}

export default TopBar