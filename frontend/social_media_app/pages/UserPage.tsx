import { useAuth } from "../context/authContext"
import PostCard from '../components/PostCard'
import { useLoaderData } from "react-router-dom";


function UserPage() {
  const {user} = useAuth()

  let img: string = '../post.jpeg';

  const {posts} = useLoaderData()

  console.log(posts, user)


  return (
    <div className="h-screen flex justify-center">
      <div className="border flex flex-col gap-3 p-3 h-full w-full mx-15 my-10 bg-amber-100 rounded-md z-1">

        <div className="flex items-center gap-5 rounded-md bg-blue-200 p-2 shadow-lg">
          <img src="../public/default.jpg" alt="profile" className="h-20 aspect-square w-fit rounded-full" />
          <div className="text-3xl font-mono">
            {user.username}
          </div>
        </div>        
        
        <div className='flex flex-wrap justify-center gap-3 m-2 overflow-y-scroll'>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              _id={post._id}
              image={post.images?.[0] || img} 
              author={post.author.username} 
              title={post.title} 
              description={post.description} 
              likes={post.likes}  
          />
          ))}
        </div>
             
      </div>
    </div>
  )
}

export default UserPage