import React, { useEffect } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import useGetMyProfile from '../hooks/useGetPorfile';
import { USER_API_END_POINT } from '../utlis/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
import axios from 'axios';

const Profile = () => {

  const { id } = useParams();
  useGetMyProfile(id)
  const disptach = useDispatch();
  const { user, profile } = useSelector(store => store.user);
  console.log(`loggedinuserId in profile:- ${user?._id}`)

  const FollowAndUnfollow = async (idd) => {
    try {
      const userId = user?._id;
      const body = JSON.stringify({ userId });
      console.log(body)
      // axios.defaults.withCredentials = true;
      // const res = await axios.post(`${USER_API_END_POINT}/unfollow/${idd}`, {id:userId});
      const res = await fetch(`${USER_API_END_POINT}/follow/${idd}`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({id:userId}),
        })
      console.log(`geting profile res:- ${res}`);
      const response = await res.json();
      disptach(followingUpdate(idd))
      disptach(getRefresh())
      console.log(`respose ${response}`)
      console.log(`res;- ${res}`)
      toast(response.message);

    } catch (error) {
      console.log(`Network error ${error}`)
    }
  }


  return (
    <>
      <ToastContainer />
      <div className='min-h-screen'>
        <div className="banner relative ">
          <div className='flex items-center gap-6 px-4 py-3 cursor-pointer sticky sm:top-0 top-[44px] bg-black dark:bg-white backdrop-blur-3xl opacity-80'>
            <Link to='/' className='backIcon hover:bg-gray-700 dark:hover:bg-[#b2ccf6] p-3 rounded-full'><IoMdArrowBack /></Link>
            <div className='flex flex-col'>
              <h2 className='text-lg font-bold '>{profile?.user?.name}</h2>
              <div className="post text-gray-400">3 post</div>
            </div>

          </div>
          <div className='h-52 '>
            <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg" alt="banner" className='h-52 w-full' />
          </div>
          <div className="avtor p-2 bg-black absolute rounded-full top-48 left-6">
            <Avatar src='https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg' size="130" round={true} />
          </div>
          {profile?.user?._id === user?._id ? (
            <div className='font-bold  border border-white dark:border-black rounded-2xl absolute px-3 py-1 right-8 top-72'>Edit Profile</div>) :
            (<div onClick={() => FollowAndUnfollow(profile?.user?._id)} className='font-bold  border border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white cursor-pointer rounded-2xl absolute px-3 py-1 right-8 top-72'>
              {user?.following.includes(id) ? "Following" : "Follow"}</div>)
          }
        </div>

        <div className='my-20 mx-10'>
          <h3 className='font-bold text-2xl'>{profile?.user?.name}</h3>
          <span className='text-gray-400'>{`@${profile?.user?.username}`}</span>
        </div>
      </div>
    </>
  )
}

export default Profile
