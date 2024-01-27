import { createSlice } from "@reduxjs/toolkit";


const commentsSlice = createSlice({
    name : "comments",
    initialState: {
        comments : [],
    },
    reducers : {
        // setcomment(state,action){
        //     state.comments = action.payload
        // },
    },
})


const commentsReducer = commentsSlice.reducer
const commentsActions = commentsSlice.actions

export { commentsActions, commentsReducer}

