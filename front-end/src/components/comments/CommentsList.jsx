import { BsPencilSquare, BsTrash } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";
import moment from "moment";
import { deleteComment } from "../../redux/apiCalls/commentsApiCall";

const CommentsList = ({ setcommentPostModel, comments, commentPostModel }) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    
    const deleteCommentHandler = (id) => {
        Swal.fire({
            title: "Are you sure to delete your comment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete the comment!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteComment(id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your comment has been deleted.",
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your comment is safe :)",
                    icon: "error"
                });
            }
        });
    }
    return (
        <div>
            <p className="my-4 text-2xl font-bold text-blue-color"  >{comments?.length} Comments</p>
            <div className="flex flex-col gap-4">
                {comments?.map(comment => (
                    // todo profile picture or let say like youtube comments
                    <div key={comment?._id} className="flex flex-col gap-3 p-4 border-2 border-black rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <p className="font-bold text-primary-color">{comment?.username}</p>
                                {comment?.edited && <p className="text-sm font-bold text-pumpkin-color">(Edited)</p>}
                            </div>
                            <div className="flex items-center gap-1 font-bold text-pumpkin-color">
                                {moment(comment?.createdAt).fromNow(true)}
                                <span> ago</span>
                            </div>


                        </div>
                        <p>{comment.text}</p>
                        {comment.user == user?._id && (
                            <div className="flex justify-end gap-2" >
                                <BsPencilSquare className="cursor-pointer text-green-color " onClick={() => { setcommentPostModel({ id: comment._id }) }} />
                                <BsTrash className="cursor-pointer text-red-color " onClick={() => { deleteCommentHandler(comment._id) }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CommentsList