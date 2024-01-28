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

export const getCommentsCount = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/comments", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(adminActions.setCommentsCount({ count: data }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};


export const createCategory = (title) => {
    return async (dispatch,getState) => {
        try {
            const {data} = await request.post("/api/categories/",{title},{
                headers : {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoriesActions.createCategory({data : data}))
            toast.success("category added succefuly")
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}