import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='flex-2 flex h-20 items-center justify-between gap-4 rounded-2xl border border-amber-200/70 bg-amber-50/90 px-6 shadow-xl shadow-amber-900/10'>
        <Link to={'/'}>
          <h1 className='display-title text-4xl font-bold tracking-tight text-amber-950 md:text-5xl'>TechTonic</h1>
        </Link>

        <Link
          to={'/post'}
          className='rounded-full bg-amber-800 px-5 py-2 font-semibold text-amber-50 shadow-lg shadow-orange-300/45 transition hover:-translate-y-0.5 hover:bg-amber-900'
        >
          Write Blog
        </Link>
      </div>
    </>
  )
}

export default Navbar