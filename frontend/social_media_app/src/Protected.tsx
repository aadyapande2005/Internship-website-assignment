import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import TopBar from '../components/TopBar';

function Protected() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <>
    {
      user ? 
      <div className='app-shell flex flex-col'>
        <div className='app-glow app-glow-left' />
        <div className='app-glow app-glow-right' />

        <div className='app-content flex min-h-screen flex-col'>
          <TopBar />
          <Outlet />
          <footer className='mt-auto border-t border-white/20 bg-slate-950/35 px-6 py-6 text-slate-200 backdrop-blur-sm'>
            <p className='text-sm tracking-wide'>Private workspace for your posts and profile.</p>
          </footer>
        </div>
      </div> 
      : 
      <div className='mx-auto my-20 w-fit rounded-2xl border border-white/35 bg-white/80 px-8 py-6 text-lg text-slate-800 shadow-xl backdrop-blur'>
        Cannot access. Please login first.
      </div>
    }      
    </>
  )
}

export default Protected