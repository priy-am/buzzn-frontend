import React, { useEffect } from 'react'
import LeftSideBar from './LeftSideBar'
import {Outlet, useNavigate} from 'react-router-dom'
import RightSideBar from './RightSideBar'
import useGetOtherProfile from '../hooks/useGetOtherProfile'
import { useSelector } from 'react-redux'
import useGetMytweet from '../hooks/useGetMytweet'


const Home = () => {
    const {user} = useSelector(store=> store.user)
    
    const navigate = useNavigate()
    useEffect(() => {
      if(!user){
        navigate("/login")
      }
    }, [])
    
    useGetOtherProfile(user?._id)
    useGetMytweet(user?._id)
    

    return (
        <div className='bg-black dark:bg-white sm:flex mx-auto text-white dark:text-black'>
            <div className='sm:w-[188px] xl:w-1/2 p-3 relative'>
                <LeftSideBar />
            </div>

            <div className=' w-full xl:w-[calc(100%-112px)] border-x-[1px] border-x-white dark:border-x-black'>
                <Outlet/>
            </div>
            <div className='third body  w-[70%] pl-5 hidden md:block'>
                <RightSideBar />
            </div>

        </div>
    )
}

export default Home
