import { toast } from "react-hot-toast";
import request from "../../utils/request";
import { profileAction } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";

export function getUserProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/users/profile/${id}`);
      dispatch(profileAction.setProfile(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUserPhotoProfile(image) {
  return async (dispatch, getState) => {
    try {
      // const { data } = await request.post(
      //   "/api/users/profile/profile-photo-upload",
      //   image,
      //   {
      //     // get state a function that return all the store state
      //     headers: {
      //       Authorization: "Bearer " + getState().auth.user.token,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const { data } = await request.post(
        "/api/users/profile/profile-photo-upload",
        image
      );
      dispatch(profileAction.editProfilePhoto(data.profilePhoto));
      dispatch(authActions.editPhotoProfileHeader(data.profilePhoto));
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function editUserProfile(id, info) {
  return async (dispatch, getState) => {
    try {
      let { data } = await request.put(`/api/users/profile/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      const token = getState().auth.user.token;
      data.token = token;
      dispatch(profileAction.editProfileInfo(data));
      dispatch(authActions.login(data));

      // dispatch(authActions.login(data))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// this function are not working for sure because i don't try them with the front
export function deleteUser(id) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/users/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("profileInfo");
      dispatch(profileAction.setProfileStoreNull());
      dispatch(authActions.setUserStoreNull());
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

/* 


*/
