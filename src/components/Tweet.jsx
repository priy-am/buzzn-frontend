import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { FaRegHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { IoBookmarkOutline } from "react-icons/io5";
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utlis/constant';
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookmarkUpdate } from '../redux/userSlice';
import axios from 'axios';

const Tweet = (tweet) => {
    const [bookmark, setbookmark] = useState(false)
    const [like, setlike] = useState(false)
    const { user} = useSelector(store => store.user)
    const dispatch = useDispatch()

    //format date eg;- jul 1
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    //like or dislike
    const likeDislike = async (id) => {
        setlike(!like)
        try {
            const userId = user?._id;
            console.log(userId)
            console.log(`tweet id :- ${id}`)
            // const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: userId }, {
            //     withCredentials: true
            // })
            const res = await fetch(`${TWEET_API_END_POINT}/like/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: userId })
            });
            console.log(`likes res :- ${res}`)
            const response = await res.json();
            dispatch(getRefresh())
            toast(response.message);
        } catch (error) {
            console.log(`Network error :- ${error}`)
        }
    }

    //delete tweet 
    const deleteTweet = async (id) => {
        try {
            // axios.defaults.withCredentials = true;
            // const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            const res = await fetch(`${TWEET_API_END_POINT}/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
            console.log(`delete res:- ${res}`)
            const response = await res.json()
            toast(response.message);
            dispatch(getRefresh())
            console.log(response);
        } catch (error) {
            console.log(`Network error:- ${error}`)
        }
    }

    //bookmarked
    const bookmarked = async (id) => {
        setbookmark(!bookmark);
        try {
            const userId = user?._id
            // const res = await axios.put(`${USER_API_END_POINT}/bookmark/${id}`, { id: userId }, {
            //     withCredentials: true
            // })
            const res = await fetch(`${USER_API_END_POINT}/bookmark/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: userId })
            })
            console.log("bookmarked res" + res);
            const response = await res.json();
            console.log(response.tweet);
            dispatch(bookmarkUpdate(response.tweet))
            toast(response.message);
        } catch (error) {
            console.log(`Network error:- ${error}`)
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="post px-6 py-6">
                <div className="account flex gap-3 items-center">

                    <Avatar className="rounded-full w-10 " src="https://pbs.twimg.com/profile_images/1399061346956713991/vTrN6VhT_normal.jpg" size="40" round={true} />
                    <span className="text-lg font-bold hover:underline cursor-pointer">{tweet?.userDetails[0]?.name}</span>
                    <span className="text-sm text-gray-500">@{tweet?.userDetails[0]?.username} · {formatDate(tweet?.createdAt)}</span>
                </div>
                <p className="pb-3 pl-4 mt-2 ml-8">{tweet?.description} </p>

                <div className="postimg flex flex-col justify-center items-center px-3 py-2 rounded-2xl border border-slate-500 mx-5">
                    {/* <img className="image h-[510px] mb-4 rounded-2xl" src="https://pbs.twimg.com/media/GIjGdaSWYAAOXnz?format=jpg&name=medium" alt="Image" /> */}

                    <div className="comm flex items-center justify-between w-full  gap-3">
                        

                        {/* <div className="repost flex items-center justify-center w-14 cursor-pointer gap-1">
                            <BiRepost/>
                            <span className="text-slate-500">1.9k</span>
                        </div> */}

                        <div onClick={() => likeDislike(tweet?._id)} className="likes flex items-center justify-center w-14 cursor-pointer gap-2 hover:bg-pink-500 rounded-full p-3 ">
                            {!like ? <FaRegHeart /> : <FcLike />}
                            <span className="text-slate-500">{tweet?.likes?.length}</span>

                        </div>
                        {/* <div className="views flex items-center justify-center w-14 cursor-pointer gap-1">
                            <MdOutlineAlignVerticalBottom/>
                            <span className="text-slate-500">185k</span>
                        </div> */}
                        <div className="right flex items-center justify-center cursor-pointer  gap-3 ">
                            <div onClick={() => bookmarked(tweet?._id)} className="bookmark  flex items-center justify-center hover:bg-slate-700  p-3 rounded-full dark:hover:bg-[#b2ccf6] ">
                                {!bookmark ? <IoBookmarkOutline /> : <IoBookmark />}
                            </div>
                            {
                                user?._id === tweet?.userDetails[0]?._id &&
                                <div onClick={() => deleteTweet(tweet?._id)} className="share flex items-center justify-center w-7 invert dark:invert-0">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/skkahier.json"
                                        trigger="hover"
                                        className="h-[100px] ">
                                    </lord-icon>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tweet

