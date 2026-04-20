import { apiRequest } from '../lib/apiRequest'
import type { PostData } from '../interfaces/postInterface'

interface UserDetailData {
  _id?: string
  username?: string
  email?: string
  posts?: PostData[]
}

const userDetailLoader = async ({ params }: { params: { userid?: string } }) => {
  const userid = params.userid || ''

  if (!userid) {
    return { user: null, posts: [] }
  }

  try {
    const response = await apiRequest.get(`/user/public/${userid}`)
    const user = response.data?.user as UserDetailData

    return {
      user,
      posts: user?.posts || []
    }
  } catch (error) {
    console.log(error)
    return { user: null, posts: [] }
  }
}

export default userDetailLoader
