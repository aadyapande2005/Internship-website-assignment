import { apiRequest } from "../lib/apiRequest"

const userPosts = async ({ params }: { params: { userId?: string } }) => {
    try {
        const authResponse = await apiRequest.get('/auth/islogin');
        
        if (authResponse.status !== 200) {
            return { posts: [] };
        }

        const user = authResponse.data.user;
        
        const userId = user._id;
        
        console.log(user)
        let posts = await apiRequest.get(`/user/${userId}`);

        posts = posts.data.user.posts

        return { posts };

    } catch (error) {
        console.log(error);
        return { posts: [] };
    }
}

export default userPosts;