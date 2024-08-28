import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { USER_API_END_POINT } from '../utlis/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';

const Login = () => {

  const [isLogin, setisLogin] = useState(true)
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { name, username, email, password } = data;
    if (isLogin) {
      //login
      try {
        const user = { email, password }
        // const res = await axios.post(`${USER_API_END_POINT}/login`, user, {
        //   headers: {
        //     'Content-Type': "application/json"
        //   },
        //   withCredentials: true
        // }); 
        const res = await fetch(`${USER_API_END_POINT}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(user),
        })
        console.log( `login:- ${res}`)
        const response = await res.json();
        if (res.ok) {
          toast(response.message);
          dispatch(getUser(response?.user))
          navigate('/home')
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log("Network error " + error)
      }
    } else {
      //singup
      try {
        const user = { name, username, email, password }
        // const res =  await axios.post(`${USER_API_END_POINT}/register`, user, {
        //   headers: {
        //     'Content-Type': "application/json"
        //   },
        //   withCredentials: true
        // }); 
        const res = await fetch(`${USER_API_END_POINT}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(user),
        })

        console.log(`register res ${res}`)
        const response = await res.json()
        if (res.ok) {
          toast(response.message);
        } else {
          toast.error(response.message);
        }
        // if (res.status === 200) {
        //   toast(res.data.message);
        // } else {
        //   toast.error(res.data.message);
        // }
      } catch (error) {
        console.log("network error " + error)
      }
    }
    reset();
  };


  return (

    <>
      <ToastContainer />
      <div className='login bg-black h-screen flex items-center'>
        <div className="log md:flex   w-1/2 hidden items-center justify-center">
          <svg viewBox="0 0 24 24" aria-hidden="true"
            className="invert w-1/2  ">
            <g>
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
              </path>
            </g>
          </svg>
        </div>
        <div className="right flex-col flex justify-center items-center mx-auto text-white md:m-4">
          <h2 className='md:text-6xl text-center text-3xl font-bold'>Happening now</h2>
          <div className='font-bold md:text-4xl text-2xl text-center mt-6 '>{!isLogin ? "Sing in" : "Login"}</div>
          <form className='flex flex-col  bg-[#000000cf] text-white relative md:w-3/4 w-full pt-8 gap-3  rounded-lg' action=""
            onSubmit={handleSubmit(onSubmit)}>
            {
              !isLogin && (<>
                <input className="outline-blue-500 p-3 rounded-md bg-[#333]" placeholder="Name" type="text"
                  {...register("name", {
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 3, message: "min length 3" },
                  })} />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
                <input className="outline-blue-500 p-3 rounded-md bg-[#333]" placeholder="username" type="text"
                  {...register("username", {
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 3, message: "min length 3" },
                    maxLength: { value: 8, message: "max length 8" },
                  })} />
                {errors.username && (
                  <div className="text-red-500">{errors.username.message}</div>
                )}
              </>)
            }


            <input className="outline-blue-500 p-3 rounded-md bg-[#333]" placeholder="Email" type="email"
              {...register("email", {
                required: { value: true, message: "Email Address is required" },
              })} />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}

            <div className=' relative'>
              <input className="outline-blue-500 p-3 w-full rounded-md bg-[#333]" placeholder="password" type={!show ? "password" : "text"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                  minLength: { value: 7, message: "min length 7" },
                })} />
              <span className='absolute right-5 top-2' onClick={() => { setshow(!show) }}> {!show ? <IoEye size={"28px"} /> : <IoEyeOff size={"28px"} />}</span>
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}

            <input disabled={isSubmitting} type="submit" value={!isLogin ? "Create account" : "Login"} className={`${isSubmitting ? "bg-blue-300" : "bg-blue-600"} font-bold rounded-md py-2 cursor-pointer`} />
            {isSubmitting && <Loader />}
          </form>
          <div className='mt-2'>{isLogin ? "Do not have account?" : "Already have a account!"} <span onClick={() => { setisLogin(!isLogin) }} className='text-blue-600 hover:underline cursor-pointer'>{isLogin ? "Sing in" : "Login"}</span> </div>
        </div>

      </div>
    </>
  )
}

export default Login