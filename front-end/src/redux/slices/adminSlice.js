import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name : "adminSlice",
    initialState: {
        usersCount : 0,
        comments : [],
        users : [],
        posts : []
    },
    reducers : {
        setUsersCount(state,action){
            state.usersCount = action.payload.count
        },
        setComments(state,action){
            state.comments = action.payload
        },
        setUsers(state,action){
            state.users = action.payload
        },
        deleteUser(state,action){
            const filteredUsers = state.users.filter(user => user._id != action.payload)
            state.users = filteredUsers
        },
        setPosts(state,action){
            state.posts = action.payload
        },
        deletePost(state,action){
            const filteredPosts = state.posts.filter(post => post._id != action.payload)
            state.posts = filteredPosts
        },
        deleteComment(state,action){
            const filteredComments = state.comments.filter(comment => comment._id != action.payload)
            state.comments = filteredComments
        }
    },

})

const adminActions = adminSlice.actions
const adminReducer = adminSlice.reducer

export {adminActions,adminReducer}