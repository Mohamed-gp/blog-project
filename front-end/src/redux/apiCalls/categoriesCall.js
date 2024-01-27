import request from "../../utils/request";
import { categoriesActions } from "../slices/categorySlice";


export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/categories");
      
      dispatch(categoriesActions.setCate(data))
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
};
