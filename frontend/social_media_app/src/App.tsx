import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';


function App() {
  return (
    <>
        <div className='min-h-screen bg-blue-300 flex flex-col'>
          <TopBar />
          <Outlet />
          <footer className='bg-blue-400 h-30'>          
          </footer>
        </div>
    </>
  )
}


export default App
