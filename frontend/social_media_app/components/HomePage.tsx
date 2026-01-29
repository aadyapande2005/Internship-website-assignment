import PostCard from './PostCard'
import { useLoaderData } from 'react-router-dom';
import type { PostData } from '../interfaces/postInterface';


function HomePage() {
  let s: string = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, id suscipit. Autem doloribus, maiores itaque facilis cupiditate nesciunt asperiores, deserunt consequuntur, et eius incidunt at natus perspiciatis distinctio repellendus animi.';

  let img: string = './post.jpeg';

  const {posts, liked_posts} = useLoaderData() as { posts: PostData[], liked_posts: [string] };

  for(let i=0; i<posts.length; i++) {
    for(let j=0; j<liked_posts.length; j++) {
      if(posts[i]._id === liked_posts[j]) {
        posts[i].isLiked = true;
        continue;
      }
    }
    posts.isLiked = false
  }
  
  return (
    <>
      <div className='flex flex-wrap justify-center gap-3 m-2'>
        {posts.map((post, index) => (
          <PostCard 
            key={index}
            _id={post._id}
            image={post.images?.[0] || img} 
            author={post.author.username} 
            title={post.title} 
            description={post.description} 
            likes={post.likes}
            isLiked={post.isLiked}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage