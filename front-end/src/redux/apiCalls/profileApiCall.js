import axios from "axios";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { profileAction } from "../slices/profileSlice";



export const getUserProfile = (id) => async (dispatch) => {
    try {
        const { data } = await request.get(`api/users/profile/${id}`)
        dispatch(profileAction.setProfile(data))
        
    } catch (error) {
        console.log(error)
    }
}


