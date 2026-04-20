import { apiRequest } from '../lib/apiRequest'
import type { PostData } from '../interfaces/postInterface'

interface SavedPostsResponse {
  saved_posts?: {
    savedPosts?: PostData[]
  }
}

const savedPostsLoader = async () => {
  try {
    await apiRequest.get('/auth/islogin')

    const response = await apiRequest.get<SavedPostsResponse>('/user/post/saved')
    const savedPosts = (response.data?.saved_posts?.savedPosts || []).filter((post) => Boolean(post?._id))

    return { savedPosts }
  } catch (error) {
    console.log(error)
    return { savedPosts: [] }
  }
}

export default savedPostsLoader
