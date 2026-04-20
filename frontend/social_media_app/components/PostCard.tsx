import { Bookmark, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface LikeUser {
  username: string
}

interface PostCardProps {
  _id: string
  title: string
  description: string
  author: string
  authorId?: string
  likes: string[],
  topics?: string[]
  isLiked: boolean
  isSaved: boolean
  onOpenPost: () => void
}

function PostCard(props: PostCardProps) {
  const navigate = useNavigate()
  const [like, setlike] = useState<boolean>(props.isLiked);
  const [saved, setSaved] = useState<boolean>(props.isSaved)

  useEffect(() => {
    setlike(props.isLiked)
    setSaved(props.isSaved)
  }, [props.isLiked, props.isSaved, props._id])

  const [showlikes, setShowLikes] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isFetchingLikes, setIsFetchingLikes] = useState<boolean>(false)

  const [userlikes, setUserLikes] = useState<LikeUser[]>([]);


  let postlikes;

  const handleLikes = async () => {
    if (showlikes) {
      setShowLikes(false)
      return
    }

    try {
      setIsFetchingLikes(true)
      postlikes = await axios.get(`http://localhost:3000/post/getlikes/${props._id}`,{withCredentials:true})
      setUserLikes(postlikes.data.post.likes);
      setShowLikes(true)

    } catch (error: any) {
      console.log(error?.response.data)
    } finally {
      setIsFetchingLikes(false)
    }
  }

  const likePost = async () => {
    try {
      setIsLiking(true)
      if(!like) {
        const likeres = await axios.get(`http://localhost:3000/post/like/${props._id}`,{withCredentials:true})
        console.log(likeres.data)
      }
      else {
        const unlikeres = await axios.get(`http://localhost:3000/post/unlike/${props._id}`,{withCredentials:true})
        console.log(unlikeres.data)
      }

      setlike(prev => !prev)
      setShowLikes(false)

    } catch (error: any) {
      console.log(error?.response.data);
      if(error?.response.status === 401) {
        alert('Please register or login to like')
      }      
    } finally {
      setIsLiking(false)
    }
  }

  const savePost = async () => {
    try {
      setIsSaving(true)

      if (!saved) {
        await axios.get(`http://localhost:3000/post/save/${props._id}`, { withCredentials: true })
      } else {
        await axios.get(`http://localhost:3000/post/unsave/${props._id}`, { withCredentials: true })
      }

      setSaved((prev) => !prev)
    } catch (error: any) {
      console.log(error?.response?.data)
      if (error?.response?.status === 401) {
        alert('Please register or login to save posts')
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <article
      className="rise-in flex cursor-pointer flex-col gap-4 rounded-3xl border border-amber-200/70 bg-amber-50/90 p-5 shadow-xl shadow-amber-900/10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20"
      onClick={props.onOpenPost}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          props.onOpenPost()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open post ${props.title}`}
    >

      <div className="flex items-center rounded-2xl bg-amber-100/85 px-4 py-3 shadow-md shadow-amber-900/10">
        <div className="w-full flex flex-col gap-3">
          <h1 className="display-title text-2xl font-semibold text-amber-950">{props.title}</h1>
          <button
            type="button"
            className="w-fit cursor-pointer rounded-lg border border-orange-200 bg-orange-100 px-2 italic text-amber-900 shadow-sm"
            onClick={(event) => {
              event.stopPropagation()
              if (props.authorId) {
                navigate(`/user/${props.authorId}`)
              }
            }}
            disabled={!props.authorId}
          >
            {props.author}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-orange-50 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-700">Tech Note</p>
        <p className="mt-2 text-sm leading-6 text-amber-900">{props.description.slice(0, 220)}{props.description.length > 220 ? '...' : ''}</p>

        {!!props.topics?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {props.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-orange-200 bg-orange-100 px-2 py-1 text-xs font-semibold text-amber-900"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* User Likes section */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            className="pressable w-fit cursor-pointer rounded-full bg-orange-100 p-2 text-2xl transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={(event) => {
              event.stopPropagation()
              likePost()
            }}
            disabled={isLiking}
          >
            {like ? <Heart fill="currentColor" className="text-orange-500" /> : <Heart className="text-slate-700" />}
          </button>

          <button
            className="pressable w-fit cursor-pointer rounded-full bg-amber-100 p-2 text-2xl transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={(event) => {
              event.stopPropagation()
              savePost()
            }}
            disabled={isSaving}
            aria-label={saved ? 'Unsave post' : 'Save post'}
          >
            {saved ? <Bookmark fill="currentColor" className="text-amber-800" /> : <Bookmark className="text-slate-700" />}
          </button>
        </div>

        <button
          className="pressable w-fit cursor-pointer rounded-2xl bg-amber-900 px-3 py-1 italic text-amber-50 shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          onClick={(event) => {
            event.stopPropagation()
            handleLikes()
          }}
          disabled={isFetchingLikes}
        >
          {isFetchingLikes ? 'Loading...' : showlikes ? 'Hide likes' : 'Liked by'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className={`likes-panel border flex flex-col overflow-y-auto ${showlikes ? 'max-h-40 opacity-100 border-amber-300' : 'max-h-0 opacity-0 border-transparent'}`}>
          {
            showlikes &&
            userlikes.map((like, id) =>
              <div key={id} className="flex items-center gap-5 border-b border-amber-200 bg-orange-50 px-3 py-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-sm font-bold text-amber-900">
                  {(like?.username || 'U').slice(0, 1).toUpperCase()}
                </div>
                <div className="rounded-md bg-amber-100 p-1 italic text-amber-900 shadow-sm">{like.username}</div>
              </div>

            )
          }
        </div>
      </div>
    </article>
  )
}

export default PostCard