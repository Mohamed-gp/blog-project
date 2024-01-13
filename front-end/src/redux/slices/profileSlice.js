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
    }
  },
});

const profileAction = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export { profileAction, profileReducer };
