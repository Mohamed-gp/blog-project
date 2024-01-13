import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileAction } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";


export function getUserProfile (id) { 
    return async (dispatch) => {
    try {
        const { data } = await request.get(`api/users/profile/${id}`)
        dispatch(profileAction.setProfile(data))
        
    } catch (error) {
        console.log(error)
    }
}
}


export function updateUserPhotoProfile (image) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post("/api/users/profile/profile-photo-upload",image,{
                // get state a function that return all the store state 
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                },
                
            })
            dispatch(profileAction.editProfilePhoto(data.profilePhoto))
            dispatch(authActions.editPhotoProfileHeader(data.profilePhoto))
            const user = JSON.parse(localStorage.getItem("userInfo"))
            
            user.profilePhoto = data?.profilePhoto
            localStorage.setItem("userInfo",JSON.stringify(user))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
}

export function editUserProfile (id,info) {
    return async (dispatch,getstate) => {
        try {
            const { data } = await request.post(`/api/profile/${id}`,info,{
                headers : {
                    Authorization : "Bearer " + getstate().auth.user.token
                }
            })
            console.log(data)
            dispatch(profileAction.editProfileInfo(data))
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
} 