import Navbar from './Navbar'
import User from './User'

function TopBar() {
  return (
    <>
      <div className='flex items-center gap-2'>
        <Navbar />
        <User username={'Aadya'} />
      </div>
    </>
  )
}

export default TopBar