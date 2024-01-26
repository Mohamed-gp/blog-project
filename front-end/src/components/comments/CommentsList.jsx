import { BsPencilSquare, BsTrash } from "react-icons/bs"
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Moment from "react-moment"

const CommentsList = ({ setcommentPostModel, comments }) => {
    const user = useSelector(state => state.auth.user)
    const deleteCommentHandler = () => {
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
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
                            <p className="font-bold text-primary-color">{comment?.username}</p>
                            <div className="flex items-center gap-1 font-bold text-pumpkin-color">
                                <Moment fromNow ago >
                                    <p className="">{comment?.createdAt}</p>
                                </Moment>
                                 ago
                            </div>


                        </div>
                        <p>{comment.text}</p>
                        {comment._id === user?._id && (
                            <div className="flex justify-end gap-2" >
                                <BsPencilSquare className="cursor-pointer text-green-color " onClick={() => { setcommentPostModel(prev => !prev) }} />
                                <BsTrash className="cursor-pointer text-red-color " onClick={() => { deleteCommentHandler() }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CommentsList