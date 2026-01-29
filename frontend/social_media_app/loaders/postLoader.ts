import { apiRequest } from '../lib/apiRequest'

const getposts = async () => {
    try {
        let posts
        try {
            const response = await apiRequest.get('/post')
            
            posts = response.data.posts
        
    
        } catch (error) {
            console.log(error?.response.data)
            return { posts:[] }
        }
    
        try {
            const user = await apiRequest.get('/auth/islogin');
            
            const userid = user.data.user._id;
        
            let liked_posts = await apiRequest.get(`user/post/liked`)
        
            
            liked_posts = liked_posts.data.liked_posts.likes
            console.log(liked_posts)
    
            return {posts, liked_posts}
    
        } catch (error) {
            console.log(error?.response.data)
            return { posts, liked_posts: [] }
        }
    } catch (error) {
        console.log(error)
        return {posts: [], liked_posts: []}
    }

}

export default getposts;