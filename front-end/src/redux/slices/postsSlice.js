import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsCount: null,
    postsCate: [],
    isLoading: false,
    createPostProcess: false,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCate(state, action) {
      state.postsCate = action.payload;
    },
    setLoadingFalse(state, action) {
      state.isLoading = false;
    },
    setLoadingTrue(state, action) {
      state.isLoading = true;
    },
    // setPostIsCreated(state, action) {
    //   (state.createPostProcess = true), (state.isLoading = true);
    // },
    // setCreatedSucc (state,action){
    //     state.isPostCreated = true
    // }
  },
});

const postsAction = postsSlice.actions;
const postsReducer = postsSlice.reducer;

export { postsAction, postsReducer };
