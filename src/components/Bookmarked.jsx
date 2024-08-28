import React from 'react'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

const Bookmarked = () => {
  const { user } = useSelector(store => store.user)
  console.log(user.bookmarks)
  return (
    <div className=''>
      <div className='flex items-center gap-10'>
        <Link to='/' className='backIcon hover:bg-gray-700 dark:hover:bg-[#b2ccf6] p-3 mx-6 rounded-full'><IoMdArrowBack /></Link>
        <h2 className='text-center py-3 text-4xl font-bold pt-6 font-mono'>Bookmarked Tweets</h2>
      </div>

     {
      user.bookmarks.length <=0 && <div className='h-screen flex justify-center items-center font-bold text-4xl'> There is no bookmark yet now </div>
      } 

      {
        user.bookmarks.map((tweet) => <Tweet key={tweet?._id} {...tweet} />)
      }

    </div>
  )
}

export default Bookmarked
