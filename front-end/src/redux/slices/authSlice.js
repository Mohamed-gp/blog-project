import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerUser : null,
  },
  reducers: {
    login(state, action) {
      // action.payload we get when we call login({} :payload)
      state.user = action.payload;
    },
    logout(state,action) {
      state.user = null
      state.registerUser = null
    },
    register(state,action){
      state.registerUser = action.payload.message
      state.user = action.payload.user
    },
    
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
