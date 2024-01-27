import { toast } from "react-toastify";
import request from "../../utils/request";
import { postsAction } from "../slices/postsSlice";

// get posts based on page
export function getPosts(pageNumber, category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postsAction.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postsAction.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function getPostBasedCate(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?&category=${category}`);
      dispatch(postsAction.setPostsCate(data));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

export function createPost(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(postsAction.setLoadingTrue());
      const { data } = await request.post("/api/posts", info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      // dispatch(postsAction.setPostinProcessTrue());
      // dispatch(postsAction.setPostinProcessFalse());
      dispatch(postsAction.setLoadingFalse());
      toast.success("Post Created Succefully");
    } catch (error) {
      dispatch(postsAction.setLoadingFalse());

      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

export function getPostById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/posts/${id}`);
      dispatch(postsAction.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function likeToggle(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/likes/${postId}`, null, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postsAction.setLikes(data.likes));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function updatePostImage(id, postImage) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/upload-image/${id}`,
        postImage,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return toast.success("image Uploaded successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

export function updatePostInfo(postId, postInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, postInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postsAction.setpostinfo(data));
      toast.success("Post Info Changed Successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}


export function deletePost (postId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`,{
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postsAction.deletePost({id : postId}))
      

    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
} 
