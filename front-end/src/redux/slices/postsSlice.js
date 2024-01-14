import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name : "posts",
    initialState: {
        posts: [],
        postsCount : null,
        postsCate : []
        
    },
    reducers: {
        setPosts(state,action){
            state.posts = action.payload
        },
        setPostsCount(state,action){
            state.postsCount = action.payload
        },
        setPostsCate (state,action) {
            state.postsCate = action.payload
        },
    },
})

const postsAction = postsSlice.actions
const postsReducer = postsSlice.reducer

export {postsAction , postsReducer}



