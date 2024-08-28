import React from 'react'
import Home from './Home';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Feed from './Feed';
import Profile from './Profile';
import Bookmarked from './Bookmarked';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children:[
        {
          path:"/home",
          element: <Feed/>
        },
        {
          path:"/",
          element: <Feed/>
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
        {
          path:'/bookmarked',
          element:<Bookmarked/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
