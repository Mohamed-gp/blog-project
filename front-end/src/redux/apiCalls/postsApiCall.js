import { toast } from "react-toastify";
import request from "../../utils/request";
import { postsAction } from "../slices/postsSlice";




// get posts based on page
export function getPosts(pageNumber,category){
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}&category=${category}`)
            dispatch(postsAction.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
}



export function getPostsCount (){
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/posts/count`)
            dispatch(postsAction.setPostsCount(data))
        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }

    }
}