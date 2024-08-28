import React, { useState } from 'react'
import useUniqueId from './useUniqueId';
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../utlis/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMyProfile, getOtherUser, getUser } from '../redux/userSlice';
import { getAlltweet } from '../redux/tweetSlice';
import axios from 'axios';


const LeftSideBar = () => {
    const [darkMode, setdarkMode] = useState(true)
    const { user } = useSelector(store => store.user)
    const navigate = useNavigate()
    const disptach = useDispatch()

    const LogOut = async()=>{
        try {
            // const res = await axios.get(`${USER_API_END_POINT}/logout`);
            const res = await fetch(`${USER_API_END_POINT}/logout`);
            console.log(`leftsidebar means logout res:- ${res}`)
            const response = await res.json();
            console.log(response.message);
            toast(response.message)
            navigate("/login")
            disptach(getUser(null))
            disptach(getOtherUser(null))
            disptach(getMyProfile(null))
        } catch (error) {
            console.log(`Network error:- ${error}`)
        }
    }

    const components = [
        {
            id: useUniqueId(),
            icon: <IoHome />,
            name: "Home",
            slug: ""
        },
        {
            id: useUniqueId(),
            icon: <IoBookmark />,
            name: "Bookmarked",
            slug: ""
        },
        {
            id: useUniqueId(),
            icon: <FaRegUser />,
            name: "Profile",
            slug: `${user?._id}`
        },
    ];
    //for dark theme
    const dark = () => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }
    const setdarkTheme = () => {
        setdarkMode(!darkMode);
        dark()
    }
    return (
        <>
        <ToastContainer/>
        <div className='sidebar  flex flex-col items-end sm:sticky sm:top-3 bottom-0 sm:min-h-screen'>
            <div className="logo sm:w-[55%] w-screen  flex sm:flex-col xl:flex-row sm:justify-center justify-evenly sm:gap-4 xl:gap-14 sm:h-full h-12  sm:static fixed top-0 left-0 bg-black dark:bg-white ">
                <svg viewBox="0 0 24 24" aria-hidden="true"
                    className="w-8 invert dark:invert-0">
                    <g>
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                        </path>
                    </g>
                </svg>
                <div className='' onClick={() => { setdarkTheme() }}>{darkMode ? <IoIosSunny size={'30px'} /> : <MdDarkMode size={'30px'} />}</div>
            </div>
            <ul className="flex m-auto sm:mt-3 sm:h-full h-12 items-center sm:items-start  sm:flex-col sm:gap-2 mt-4 xl:mr-5 text-xl sm:static fixed bottom-0 right-0 justify-evenly sm:justify-normal min-w-fit w-full sm:w-fit sm:m-0 bg-black dark:bg-white sm:bg-transparent ">
                {
                    components.map((item) => {
                        return (
                            <li key={item.id} className="cursor-pointer ">
                                <Link to={`/${item.name.toLowerCase()}/${item.slug}`} className='flex items-center justify-start gap-3 w-fit sm:py-4 sm:px-5 p-3 hover:bg-gray-700 dark:hover:bg-[#b2ccf6] sm:mx-0  hover:rounded-full'>
                                    <div>{item.icon}</div>
                                    <span className="hidden xl:block">{item.name}</span>
                                </Link>

                            </li>
                        )
                    })
                }
                <li onClick={()=>LogOut()} className="cursor-pointer ">
                    <div  className='flex items-center justify-start gap-3 w-fit sm:py-4 sm:px-5 p-3 hover:bg-gray-700 dark:hover:bg-[#b2ccf6] sm:mx-0  hover:rounded-full'>
                        <div><IoMdLogOut /></div>
                        <span className="hidden xl:block">LogOut</span>
                    </div>

                </li>
            </ul>

            <div className="btn  cursor-pointer font-bold bg-[#1d9bf0] rounded-full xl:px-5 py-3 xl:w-52 text-lg h-[50px] w-[50px] flex justify-center items-center xl:my-3  sm:mr-5 fixed sm:static bottom-16 right-2">
                <span className="hidden xl:block">Post</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="invert w-8 block xl:hidden"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g>
                </svg>
            </div>

        </div>
        </>
    )
}

export default LeftSideBar
