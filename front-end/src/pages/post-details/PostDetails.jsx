import { useParams } from "react-router-dom"
import { BsFillHandThumbsUpFill, BsFillTrashFill, BsImageFill, BsPencilSquare } from "react-icons/bs";
import Title from "../../components/title/Title";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentsList from "../../components/comments/CommentsList";
import Swal from "sweetalert2";
import UpdatePostModel from "./UpdatePostModel";
import UpdateCommentModel from "../../components/comments/UpdateCommentModel";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, getPosts } from "../../redux/apiCalls/postsApiCall";


const PostDetails = () => {
  const dispatch = useDispatch()
  const [isOpenModel, setisOpenModel] = useState(false)
  const [commentPostModel, setcommentPostModel] = useState(false)
  const [file, setfile] = useState(null)
  const posts = useSelector(state => state.postsReducer.posts)
  const post = useSelector(state => state.postsReducer.post)
  const user = useSelector(state => state.auth.user)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getPostById(id))
    window.scrollTo(0, 0)
  }, [])
  




  const updateImageSubmitHandler = (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning("no file provided")
    }
    return toast.success("image Uploaded seccefuly")

  }
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure to delete your post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your post is safe :)",
          icon: "error"
        })
      }
    });
  }
  return (
    <>
      <div className="container px-6 my-6">
        <div className="max-w-[500px] lg:w-[450px] mx-auto">
          <img src={file ? URL.createObjectURL(file) : post?.image?.url} alt="" className="w-full mx-auto" />
        </div>
        {post?.user?._id === user?._id && (
          <div className="lg:w-[450px] mx-auto">
            <form onSubmit={updateImageSubmitHandler} className="flex items-center gap-2 my-3 -ml-3 lg:-ml-6">
              <label htmlFor="file" className="flex gap-1 font-bold cursor-pointer text-blue-color">
                <BsImageFill />
                <p>select new image</p>
              </label>
              <input type="file" name="file" id="file" className="hidden" onChange={(e) => { setfile(e.target.files[0]) }} />
              <button type="submit" className="px-2 py-1 text-white rounded-xl bg-gray-color">Upload</button>
            </form>
          </div>
        )}
        <div className="text-center">
          <Title title={post?.title} />
        </div>
        <div className="lg:w-[750px] mx-auto">
          <div className="flex items-center justify-center w-full gap-3 mx-auto">
            <div className="overflow-hidden rounded-full w-14">
              <img src="/assets/images/user-avatar.png" alt="avatar" />
            </div>
            <div className="flex flex-col ">
              <p className="font-bold text-blue-color">{post?.user?.username}</p>
              <p className="text-gray-color">{new Date(post?.user?.createdAt).toDateString()}</p>
            </div>
          </div>
          <p className="my-4">{post?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dignissimos, odit natus incidunt libero autem commodi alias ea fugit debitis dolores quam aut, reprehenderit possimus earum praesentium nemo minus. Voluptatibus.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-2xl font-bold cursor-pointer likes text-blue-color">
              <BsFillHandThumbsUpFill />
              <p>{post?.likes?.length} Likes</p>
            </div>
            {post?.user?._id === user?._id && (
              <div className="flex items-center gap-1 text-2xl font-bold likes text-blue-color">
                <BsPencilSquare className="cursor-pointer text-green-color" onClick={() => { setisOpenModel(prev => !prev) }} />
                <BsFillTrashFill className="cursor-pointer text-red-color" onClick={() => { deletePostHandler() }} />
              </div>)}


          </div>
          <AddComment />
          <CommentsList setcommentPostModel={setcommentPostModel} comments={post?.comments}/>
        </div>
      </div>
      {isOpenModel && <UpdatePostModel setisOpenModel={setisOpenModel} post={post} />}
      {commentPostModel && <UpdateCommentModel setcommentPostModel={setcommentPostModel} />}
    </>
  )
}
export default PostDetails