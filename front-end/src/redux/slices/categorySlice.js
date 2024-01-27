import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories : [],
    },
    reducers : {
        setCate(state,action){
            state.categories = action.payload
        },
    }

})


const categoriesActions = categorySlice.actions
const categoriesReducer = categorySlice.reducer


export { categoriesActions , categoriesReducer}