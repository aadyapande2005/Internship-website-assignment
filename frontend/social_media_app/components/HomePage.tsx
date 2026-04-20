import { useState } from 'react'
import PostCard from './PostCard'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import type { PostData } from '../interfaces/postInterface';

interface PaginationData {
  page: number
  limit: number
  totalPosts: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
}


function HomePage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const {posts, liked_posts, saved_posts, pagination} = useLoaderData() as {
    posts: PostData[]
    liked_posts: string[]
    saved_posts: string[]
    pagination: PaginationData
    topic?: string
  };

  const currentTopic = (searchParams.get('topic') || '').trim().toLowerCase()
  const [topicInput, setTopicInput] = useState(currentTopic)

  const currentPage = pagination?.page || Number(searchParams.get('page') || 1) || 1

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > (pagination?.totalPages || 1)) return
    const nextParams: Record<string, string> = { page: String(newPage) }
    if (currentTopic) nextParams.topic = currentTopic
    setSearchParams(nextParams)
  }

  const applyTopicFilter = () => {
    const normalizedTopic = topicInput.trim().toLowerCase()
    const nextParams: Record<string, string> = { page: '1' }

    if (normalizedTopic) {
      nextParams.topic = normalizedTopic
    }

    setSearchParams(nextParams)
  }

  const clearTopicFilter = () => {
    setTopicInput('')
    setSearchParams({ page: '1' })
  }
  
  return (
    <>
      <section className='mx-auto w-full max-w-7xl px-4 pb-10 pt-4'>
        <div className='rise-in mb-6 rounded-3xl border border-amber-200/70 bg-amber-50/90 px-6 py-5 shadow-xl shadow-amber-900/10'>
          <h2 className='display-title text-3xl font-semibold text-amber-950 md:text-4xl'>Latest Tech Blogs</h2>
          <p className='mt-1 text-amber-800'>Deep dives, practical notes, and engineering ideas from the community.</p>

          <div className='mt-4 flex flex-wrap items-center gap-3'>
            <input
              type='text'
              value={topicInput}
              onChange={(event) => setTopicInput(event.target.value)}
              placeholder='Filter by topic (e.g. react, nodejs, ai)'
              className='w-full max-w-md rounded-2xl border border-amber-300 bg-white px-4 py-2 text-amber-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200'
            />
            <button
              className='pressable cursor-pointer rounded-full bg-amber-900 px-4 py-2 text-amber-50'
              onClick={applyTopicFilter}
            >
              Search Topic
            </button>
            <button
              className='pressable cursor-pointer rounded-full border border-amber-300 bg-amber-50/90 px-4 py-2 text-amber-900'
              onClick={clearTopicFilter}
            >
              Clear
            </button>
          </div>

          {currentTopic && (
            <p className='mt-3 text-sm text-amber-800'>Showing topic: <span className='rounded-full bg-orange-100 px-2 py-1 font-semibold'>{currentTopic}</span></p>
          )}
        </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          
          <PostCard 
            key={post._id}
            _id={post._id}
            author={post.author.username} 
            authorId={post.author._id}
            title={post.title} 
            description={post.description} 
            likes={post.likes}
            topics={post.topics || []}
            isLiked={liked_posts.includes(post._id)}
            isSaved={saved_posts.includes(post._id)}
            onOpenPost={() => navigate(`/post/${post._id}`)}
          />
        ))}
      </div>

      <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
        <button
          className='pressable cursor-pointer rounded-full border border-amber-300 bg-amber-50/90 px-4 py-2 text-amber-900 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => changePage(currentPage - 1)}
          disabled={!pagination?.hasPrevPage}
        >
          Previous
        </button>

        <div className='rounded-full border border-amber-300 bg-orange-50/90 px-4 py-2 text-sm text-amber-900'>
          Page {currentPage} of {pagination?.totalPages || 1}
        </div>

        <button
          className='pressable cursor-pointer rounded-full border border-amber-300 bg-amber-50/90 px-4 py-2 text-amber-900 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => changePage(currentPage + 1)}
          disabled={!pagination?.hasNextPage}
        >
          Next
        </button>
      </div>
      </section>
    </>
  )
}

export default HomePage