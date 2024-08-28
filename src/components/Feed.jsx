import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const {tweets,followingTweet, follow, following} = useSelector(store=>store.tweet)
  console.log(followingTweet?.tweets)

  return (
    <div>
      <CreatePost/>
      {
        follow && tweets?.tweets?.map((tweet)=> <Tweet key={tweet?._id} {...tweet} />)
      }
      {/* {
        following && followingTweet?.tweets?.map((tweet)=> <Tweet key={tweet?._id} {...tweet}/>)
      } */}
    </div>
  )
}

export default Feed
