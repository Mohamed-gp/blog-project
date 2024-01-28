import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";
import { categoriesReducer } from "./slices/categorySlice";
import { commentsReducer } from "./slices/commentsSlice";
import { adminReducer } from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth  : authReducer,
    profile : profileReducer,
    postsReducer: postsReducer,
    categoriesReducer : categoriesReducer,
    commentsReducer : commentsReducer,
    adminReducer : adminReducer,
  },
});

