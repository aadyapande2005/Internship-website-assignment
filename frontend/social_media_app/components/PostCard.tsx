import { Heart } from "lucide-react"
import { useState } from "react"
import axios from "axios"

interface PostCardProps {
  _id: string
  title: string
  image: string
  description: string
  author: string
  likes: string[]
}

function PostCard(props: PostCardProps) {
  const [like, setlike] = useState<boolean>(false);

  const [showlikes, setShowLikes] = useState<boolean>(false)

  const [userlikes, setUserLikes] = useState([]);

  let postlikes;

  const handleLikes = async () => {
    try {
      postlikes = await axios.get(`http://localhost:3000/post/getlikes/${props._id}`,{withCredentials:true})
      console.log(postlikes)
      setShowLikes(prev => !prev)
      setUserLikes(postlikes.data.post.likes);

    } catch (error) {
      console.log(error?.response.data)
    }
  }

  const likePost = async () => {
    try {
      if(!like) {
        const likeres = await axios.get(`http://localhost:3000/post/like/${props._id}`,{withCredentials:true})
        console.log(likeres.data)
      }
      else {
        const unlikeres = await axios.get(`http://localhost:3000/post/unlike/${props._id}`,{withCredentials:true})
        console.log(unlikeres.data)
      }

      setlike(prev => !prev)
      setShowLikes(prev => !prev)

    } catch (error) {
      console.log(error?.response.data);
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-100 border border-amber-50 bg-amber-100 shadow-gray-500 shadow-md rounded-xl px-4 py-2">

      <div className="flex items-center bg-blue-200 py-3 px-5 rounded-2xl shadow-gray-500 shadow-md">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-2xl font-mono underline">{props.title}</h1>
          <h1 className="italic w-fit px-2 rounded-lg bg-amber-100 shadow-black shadow-md cursor-pointer">{props.author}</h1>
        </div>
        <img src="./default.jpg" alt="profile-img" className='h-12 aspect-square rounded-full shadow-md shadow-gray-500 mr-2' />
      </div>

      <div className="h-full w-full flex justify-center bg-blue-200">
        <img src={props.image} alt="post-img" />
      </div>

      <p className="font-mono">{props.description.slice(0, 200)} .....</p>

      {/* User Likes section */}
      <button
        className="text-2xl rounded-full bg-blue-200 p-2 cursor-pointer w-fit"
        onClick={likePost}
      >
        {like ? <Heart fill="black" /> : <Heart />}
      </button>
      <div className="flex flex-col gap-3">
        <button className="w-fit underline italic cursor-pointer bg-blue-300 px-3 py-1 rounded-2xl shadow-black shadow-md" onClick={handleLikes}>
          Liked by
        </button>
        <div className="border flex flex-col border-gray-400 max-h-40 overflow-y-auto">
          {
            showlikes &&
            userlikes.map((like, id) =>
              <div className="flex gap-5 items-center py-1 px-3 border-b bg-blue-200">
                <img src={like?.avatar || './default.jpg'} className="h-10 rounded-full" />
                <div className="p-1 rounded-md bg-amber-100 italic font-mono shadow-black shadow-md">{like.username}</div>
              </div>

            )
          }
        </div>
      </div>
    </div>
  )
}

export default PostCard