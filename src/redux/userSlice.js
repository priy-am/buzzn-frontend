import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null,
    otherUsers:null,
    profile:null,
    bookmarks:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser:(state,action)=>{
      state.user = action.payload;
    },
    getOtherUser:(state,action)=>{
      state.otherUsers = action.payload;
    },
    getMyProfile:(state,action)=>{
      state.profile = action.payload;
  },
  followingUpdate:(state,action)=>{
    if(state.user.following.includes(action.payload)){
      //unfollow
      state.user.following = state.user.following.filter((itemId)=>{
        return itemId !== action.payload
      })
    }else{
      //follow
      state.user.following.push(action.payload)
    }
  },

  bookmarkUpdate:(state,action)=>{
    const existingBookmarkIndex = state.user.bookmarks.findIndex(bookmark => bookmark._id === action.payload._id);

  if (existingBookmarkIndex !== -1) {
    state.user.bookmarks.splice(existingBookmarkIndex, 1);
  }else{
      //bookmark
      state.user.bookmarks.push(action.payload)
    }
    state.user.bookmarks = state.user.bookmarks.filter(itemId => itemId !== null && itemId !== undefined);
    return { ...state };
  }

  },
})

export const { getUser, getOtherUser, bookmarkUpdate, getMyProfile, followingUpdate } = userSlice.actions

export default userSlice.reducer