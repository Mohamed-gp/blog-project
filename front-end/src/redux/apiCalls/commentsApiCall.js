import request from "../../utils/request";
import { postsAction } from "../slices/postsSlice";
import { toast } from "react-hot-toast";

// export const getComments = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await request.get();
//     } catch (error) {
//       console.log(error.response.data.message);
//       toast.error(error.response.data.message);
//     }
//   };
// };

/* 
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
*/
export const createComment = (text, postid) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/comments",
        { text, postId: postid },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postsAction.addComment(data));
      return toast.success("comment added successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
};

export const editComment = (text, commentId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        { text },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(
        postsAction.editComment({ text: data.text, editedCommentId: data._id })
      );
      toast.success("post changed succefuly");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch, getState) => {
    try {
      const {data} = await request.delete(`/api/comments/${commentId}`,{
        headers : {
          Authorization : "Bearer " + getState().auth.user.token
        }
      })
      dispatch(postsAction.deleteCommentFromPost({id : commentId}))
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
};
