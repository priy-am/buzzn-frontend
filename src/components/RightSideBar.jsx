import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const RightSideBar = () => {
  const { otherUsers } = useSelector(store => store.user)
  return (
    <div>
      <div className="search w-3/4 m-3  cursor-pointer  md:sticky top-1">
        <input type="text" name="search" id="search"
          className="bg-[#202327] dark:bg-[#c6d9f1] text-center pr-9 py-3 text-lg rounded-full w-full cursor-pointer "
          placeholder="Search" />
        <span className='w-5 absolute top-4 left-6'><CiSearch /></span>
      </div>

      <div className="whatsHappening bg-[#202327] dark:bg-[#c6d9f1] w-3/4 rounded-2xl   m-3 py-5 md:sticky top-[10%]">
        <h1 className="font-semibold text-3xl px-4 mb-5">What's happening</h1>

        <div className="item hover:bg-[#25282d] dark:hover:bg-[#b2ccf6] px-4 py-3 space-y-1 cursor-pointer">
          <div className="text-sm text-gray-500">Trending in India</div>
          <div className="font-bold ">ICONIC WINNER MUNAWAR</div>
          <div className="text-sm text-gray-500">1.34k post</div>
        </div>
        <div className="seemore text-blue-600 hover:underline px-4 cursor-pointer w-fit">Show more</div>
      </div>

      <div className='bg-[#202327] dark:bg-[#c6d9f1] w-3/4 rounded-2xl  m-3 py-5 md:sticky top-[80%]'>
        <h2 className='font-semibold text-3xl px-4 mb-5'>Who to follow</h2>

        {
          otherUsers?.otherUsers?.map((user) => {
            
            return (
                 
              <div key={user?._id} className="suggestion flex justify-evenly items-center my-3">
                <div className='flex gap-4'>
                  <Avatar className="rounded-full w-10 " src="https://pbs.twimg.com/profile_images/1399061346956713991/vTrN6VhT_normal.jpg" size="40" round={true} />
                  <div className="name flex flex-col">
                    <span className="text-lg font-bold hover:underline cursor-pointer">{user?.name}</span>
                    <span className="text-sm text-gray-500">{`@${user?.username}`}</span>
                  </div>
                </div>
                <Link to={`/profile/${user?._id}`}>
                  <button className='text-lg bg-white dark:bg-black text-black dark:text-white rounded-full font-semibold px-4 py-2'>Profile</button>
                </Link>
              </div>

            )
          })
        }

      </div>
    </div>
  )
}

export default RightSideBar
