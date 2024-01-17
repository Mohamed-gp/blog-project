import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileInfo: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profileInfo = action.payload;
    },
    editProfilePhoto (state,action) {
      state.profileInfo.profilePhoto = action.payload
    },
    editProfileInfo (state,action){
      state.profileInfo = action.payload
    },
    setProfileStoreNull(state,action){
      state.profileInfo = null
    }
  },
});

const profileAction = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export { profileAction, profileReducer };
