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
        createCategory(state,action){
            state.categories.push(action.payload.data)
        },
        removeCate(state,action){
            filteredCate = state.categories.filter(category => category._id != action.payload.id) 
            state.categories = filteredCate
        }
    }

})


const categoriesActions = categorySlice.actions
const categoriesReducer = categorySlice.reducer


export { categoriesActions , categoriesReducer}