import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileAction } from "../slices/profileSlice";


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
            toast.success(data.message)
        } catch (error) {
            console.log(error)
        }
    }
}

