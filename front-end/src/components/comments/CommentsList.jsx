import { BsPencilSquare, BsTrash } from "react-icons/bs"
import Swal from "sweetalert2";

const CommentsList = ({setcommentPostModel,comments}) => {
    // console.log(comments)
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
                    <div key={comment} className="flex flex-col gap-3 p-4 border-2 border-black rounded-xl">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-primary-color">Youcef Abbas</p>
                            <p className="font-bold text-pumpkin-color">2 hours ago</p>
                        </div>
                        <p>hello world hello world</p>
                        <div className="flex justify-end gap-2" >
                            <BsPencilSquare className="cursor-pointer text-green-color " onClick={() => {setcommentPostModel(prev => !prev)}}/>
                            <BsTrash className="cursor-pointer text-red-color " onClick={() => { deleteCommentHandler() }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CommentsList