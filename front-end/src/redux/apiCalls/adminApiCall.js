import { toast } from "react-toastify";
import request from "../../utils/request";
import { adminActions } from "../slices/adminSlice";
import { categoriesActions } from "../slices/categorySlice";

export const getUsersCount = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/count", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(adminActions.setUsersCount({ count: data }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};

export const getComments = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/comments", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(adminActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};

export const createCategory = (title) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/categories/",
        { title },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(categoriesActions.createCategory({ data: data }));
      toast.success("category added succefuly");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/categories/${categoryId}`,{
        headers : {
            Authorization : "Bearer " + getState().auth.user.token
        }
      });
      dispatch(categoriesActions.removeCate({id : categoryId}))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};


export const getUsers = () => {
    return async (dispatch,getState) => {
        try {
            const {data} = await request.get("/api/users/profile",{
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })

            dispatch(adminActions.setUsers(data))
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

export const deleteUser = (userId) => {
    return async (dispatch,getState ) => {
        try {
            await request.delete(`/api/users/profile/${userId}`,{
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(adminActions.deleteUser(userId))
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

export const getAllPosts = () => {
    return async (dispatch,getState) => {
        try {
            const {data} = await request.get("/api/posts")
            dispatch(adminActions.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch,getState) => {
        try {
            await request.delete(`/api/posts/${postId}`,{
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })

            dispatch(adminActions.deletePost(postId))
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}



export const deleteComment = (commentId) => {
    return async (dispatch,getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`,{
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })

            adminActions.deleteComment(commentId)
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}