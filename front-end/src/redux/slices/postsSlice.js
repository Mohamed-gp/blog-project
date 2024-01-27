import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: [], 
    postsCount: null,
    postsCate: [],
    isLoading: false,
    inProcess: false,
    
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
    setPostinProcessFalse(state,action){
      state.inProcess = false
    },
    setPostinProcessTrue(state,action){
      state.inProcess = true
    },
    setPost(state,action){
      state.post = action.payload
    },
    setLikes(state,action){
      state.post.likes = action.payload
    },
    setpostinfo(state,action){
      const {title,category,description } = action.payload
      state.post.title = title
      state.post.category = category
      state.post.description = description
    },
    deletePost(state,action){
      state.posts = state.posts.filter(post => post._id != action.payload.id)
    },
    addComment(state,action){
      state.post.comments.push(action.payload)
    },
    editComment(state, action) {
      
      const editedComment = state.post.comments.filter(comment => comment._id == action.payload.id);
      const index = state.post.comments.indexOf(editedComment)
      state.post.comments[index] = state.action.payload.text
    }
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
