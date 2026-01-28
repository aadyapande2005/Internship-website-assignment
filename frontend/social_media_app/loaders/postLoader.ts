import axios from 'axios'
import type {PostData} from '../interfaces/postInterface'

const getposts = async () => {
    const response = await axios.get('http://127.0.0.1:3000/post')

    const posts: PostData[] = response.data.posts

    return { posts };
}

export default getposts;