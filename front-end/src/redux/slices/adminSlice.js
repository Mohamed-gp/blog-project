import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name : "adminSlice",
    initialState: {
        usersCount : 0,
        commentsCount : 0,
    },
    reducers : {
        setUsersCount(state,action){
            state.usersCount = action.payload.count
        },
        setCommentsCount(state,action){
            state.commentsCount = action.payload.count
        },
    },

})

const adminActions = adminSlice.actions
const adminReducer = adminSlice.reducer

export {adminActions,adminReducer}