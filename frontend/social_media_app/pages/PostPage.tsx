
import { Bookmark, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../lib/apiRequest'

type PostRef = string | { _id?: string }

interface DetailedPost {
  _id: string
  title: string
  description: string
  likes: string[]
  topics?: string[]
  author?: {
    _id?: string
    username?: string
    email?: string
  }
  createdAt?: string
}

function PostPage() {
  const { postid } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState<DetailedPost | null>(null)
  const [currentUserId, setCurrentUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLiking, setIsLiking] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (!postid) {
        setError('Post id is missing.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        try {
          const loginRes = await apiRequest.get('/auth/islogin')
          setCurrentUserId(loginRes.data?.user?._id || '')

          const savedPostsRes = await apiRequest.get('/user/post/saved')
          const savedPostIds = (savedPostsRes.data?.saved_posts?.savedPosts || [])
            .map((post: PostRef) => {
              if (typeof post === 'string') return post
              return post?._id || ''
            })
            .filter((postId: string) => Boolean(postId))

          setIsSaved(savedPostIds.includes(postid))
        } catch {
          setCurrentUserId('')
          setIsSaved(false)
        }

        const response = await apiRequest.get(`/post/getpost/${postid}`)
        setPost(response.data.findpost)
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Unable to load this post.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postid])

  const handleLikeToggle = async () => {
    if (!post || !postid || isLiking) return

    try {
      setIsLiking(true)

      const hasCurrentUserLike = (post.likes || []).some((id) => id === currentUserId)
      const endpoint = hasCurrentUserLike ? `/post/unlike/${postid}` : `/post/like/${postid}`

      await apiRequest.get(endpoint)

      const refreshed = await apiRequest.get(`/post/getpost/${postid}`)
      setPost(refreshed.data.findpost)
    } catch (err: any) {
      if (err?.response?.status === 401) {
        alert('Please login to like posts.')
      }
    } finally {
      setIsLiking(false)
    }
  }

  const handleSaveToggle = async () => {
    if (!postid || isSaving) return

    try {
      setIsSaving(true)

      const endpoint = isSaved ? `/post/unsave/${postid}` : `/post/save/${postid}`
      await apiRequest.get(endpoint)

      setIsSaved((prev) => !prev)
    } catch (err: any) {
      if (err?.response?.status === 401) {
        alert('Please login to save posts.')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl px-4">
        <div className="rise-in rounded-3xl border border-amber-200 bg-amber-50/90 px-6 py-10 text-center text-amber-900 shadow-xl">
          Loading post...
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl px-4">
        <div className="rise-in rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700 shadow-xl">
          {error || 'Post not found.'}
        </div>
      </div>
    )
  }

  const postDate = post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown date'

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-10 pt-5">
      <div className="rise-in overflow-hidden rounded-3xl border border-amber-200/80 bg-amber-50/90 shadow-2xl shadow-amber-900/15">
        <div className="border-b border-amber-200 bg-linear-to-r from-orange-100 to-amber-200 px-6 py-6">
          <h1 className="display-title text-4xl text-amber-950">{post.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-amber-900">
            <button
              type="button"
              className="rounded-full bg-amber-900 px-3 py-1 text-amber-50"
              onClick={() => {
                if (post.author?._id) {
                  navigate(`/user/${post.author._id}`)
                }
              }}
              disabled={!post.author?._id}
            >
              {post.author?.username || 'Unknown author'}
            </button>
            <span className="rounded-full border border-amber-300 bg-amber-50/80 px-3 py-1">{postDate}</span>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {!!post.topics?.length && (
            <div className="flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-semibold text-amber-900"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}

          <p className="whitespace-pre-wrap rounded-2xl border border-amber-200 bg-orange-50 p-5 text-lg leading-8 text-amber-900">{post.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-200 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="pressable flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleLikeToggle}
                disabled={isLiking}
              >
                <Heart className="text-orange-500" fill="currentColor" />
                <span>{post.likes?.length || 0} likes</span>
              </button>

              <button
                className="pressable flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleSaveToggle}
                disabled={isSaving}
              >
                {isSaved ? <Bookmark className="text-amber-800" fill="currentColor" /> : <Bookmark className="text-amber-800" />}
                <span>{isSaved ? 'Saved' : 'Save post'}</span>
              </button>
            </div>

            <button
              className="pressable cursor-pointer rounded-full border border-amber-300 bg-amber-50 px-5 py-2 text-amber-900"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostPage