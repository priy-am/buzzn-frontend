import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tweets: null,
    refresh:false,
    followingTweet:null,
    follow:true,
    following:false
}

export const userSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        getAlltweet:(state, action)=>{
            state.tweets = action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
        getFollowingTweets:(state,action)=>{
            state.followingTweet = action.payload
        },
        setfollow:(state, action)=>{
            state.follow = action.payload;
        },
        setfolloing:(state, action)=>{
            state.following = action.payload;
        }

    }
})


export const { getAlltweet, getRefresh, getFollowingTweets,setfolloing, setfollow } = userSlice.actions

export default userSlice.reducer