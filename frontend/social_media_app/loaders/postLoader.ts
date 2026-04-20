import { apiRequest } from '../lib/apiRequest'

type LikedPost = string | { _id?: string }

const getposts = async ({ request }: { request: Request }) => {
    try {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') || '1')
        const topic = (url.searchParams.get('topic') || '').trim().toLowerCase()
        const safePage = Number.isNaN(page) || page < 1 ? 1 : page

        let posts
        let pagination
        try {
            const endpoint = topic
                ? `/post/topic/${encodeURIComponent(topic)}?page=${safePage}&limit=9`
                : `/post?page=${safePage}&limit=9`

            const response = await apiRequest.get(endpoint)
            
            posts = response.data.posts
            pagination = response.data.pagination
        
    
        } catch (error: any) {
            console.log(error?.response.data)
            return {
                posts: [],
                liked_posts: [],
                saved_posts: [],
                topic,
                pagination: {
                    page: safePage,
                    limit: 9,
                    totalPosts: 0,
                    totalPages: 1,
                    hasPrevPage: false,
                    hasNextPage: false
                }
            }
        }
    
        try {
            await apiRequest.get('/auth/islogin');

            const likedPostsResponse = await apiRequest.get('user/post/liked')
            const savedPostsResponse = await apiRequest.get('user/post/saved')

            const liked_posts = (likedPostsResponse.data?.liked_posts?.likes || [])
                .map((post: LikedPost) => {
                    if (typeof post === 'string') return post
                    return post?._id || ''
                })
                .filter((postId: string) => Boolean(postId))

            const saved_posts = (savedPostsResponse.data?.saved_posts?.savedPosts || [])
                .map((post: LikedPost) => {
                    if (typeof post === 'string') return post
                    return post?._id || ''
                })
                .filter((postId: string) => Boolean(postId))
    
            return {posts, liked_posts, saved_posts, pagination, topic}
    
        } catch (error: any) {
            console.log(error?.response.data)
            return { posts, liked_posts: [], saved_posts: [], pagination, topic }
        }
    } catch (error) {
        console.log(error)
        return {
            posts: [],
            liked_posts: [],
            saved_posts: [],
            topic: '',
            pagination: {
                page: 1,
                limit: 9,
                totalPosts: 0,
                totalPages: 1,
                hasPrevPage: false,
                hasNextPage: false
            }
        }
    }

}

export default getposts;