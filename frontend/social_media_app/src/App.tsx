import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import {AuthContext} from '../context/authContext'


function App() {
  return (
    <>
      <AuthContext value={} >
        <div className='min-h-screen bg-blue-300 flex flex-col'>
          <TopBar />
          <Outlet />
          <footer className='bg-blue-400 h-30'>          
          </footer>
        </div>
      </AuthContext>
    </>
  )
}


export default App
