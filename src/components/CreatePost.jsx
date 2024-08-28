import React, { useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import Avatar from 'react-avatar';
import { TWEET_API_END_POINT } from '../utlis/constant';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRefresh, setfolloing, setfollow } from '../redux/tweetSlice';
import axios from 'axios';

const CreatePost = () => {
    const [description, setDescription] = useState('')
    const { user } = useSelector(store => store.user)
    const { follow, following } = useSelector(store => store.tweet)
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const data = { description, id: user?._id }
            console.log(description)
            // const res = await axios.post(`${TWEET_API_END_POINT}/create`, data, {
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     withCredentials: true
            // });
            const res = await fetch(`${TWEET_API_END_POINT}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })

            console.log(`createpost res ${res}`)
            const response = await res.json()
            if (res.ok) {
                toast(response.message);
                setDescription('');
                dispatch(getRefresh())
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(`Network Error:- ${error}`)
        }
    }

    const follwingTweet = async () => {
        dispatch(setfollow(false));
        dispatch(setfolloing(true))
    }

    return (
        <div>
            <ToastContainer />
            <div className=" z-10 flex items-center justify-between h-12    sm:top-0 w-full bg-black dark:bg-white backdrop-blur-3xl opacity-80 fixed top-[48px] sm:static">
                <div onClick={() => { dispatch(setfollow(true)); dispatch(setfolloing(false)) }} className="left w-1/2 text-center active:font-bold cursor-pointer hover:bg-[#1e1f20] dark:hover:bg-[#b2ccf6] p-3 relative">ForYou
                    {follow && <div className="line2 absolute h-1 w-16 z-10 bg-[#1d9bf0] bottom-0 left-[40%]"></div>}
                </div>
                <div onClick={() => follwingTweet()} className="right w-1/2 text-center active:font-bold cursor-pointer hover:bg-[#1e1f20] dark:hover:bg-[#b2ccf6] p-3">Following
                    {following && <div className="line2 absolute h-1 w-16 z-10 bg-[#1d9bf0] bottom-0 left-[65%]"></div>}
                </div>

                <div className="setting p-3 rounded-full hover:bg-[#1e1f20] dark:hover:bg-[#b2ccf6] mr-1 sm:static absolute bottom-2 right-1">
                    <IoSettingsOutline />
                </div>
            </div>

            <div className="line h-[1px] bg-slate-500"></div>

            <div className="whatshappen flex">
                <div className="profile flex justify-center items-center text-lg m-3">
                    <Avatar name='P' size="40" round={true} />
                </div>
                <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-transparent bg-[#23272c] dark:bg-[#c6d9f1] rounded-2xl mr-1 my-1 text-xl text-white dark:text-black w-full px-3 py-2 min-h-16 max-h-32  outline-none" placeholder="What is happening?!" />
            </div>
            <div className="makingPost flex gap-2 px-12 py-2 justify-between">
                <div className="blueicon flex gap-3 px-5 text-blue-500">
                    <FaImage />
                    {/* <MdOutlineGifBox />
                    <GrEmoji />
                    <MdCancelScheduleSend />
                    <IoLocationOutline /> */}

                </div>

                <button onClick={() => submitHandler()} className="btn font-bold cursor-pointer bg-[#1d9bf0] rounded-full px-5 py-1">Post</button>
            </div>

            <div className="line h-[1px] bg-slate-500"></div>
        </div>
    )
}

export default CreatePost
