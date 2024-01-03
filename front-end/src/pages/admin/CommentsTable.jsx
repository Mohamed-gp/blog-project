import { Link } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"
import Swal from "sweetalert2";

const CommentsTable = () => {
    const removeHandler = () => {
        Swal.fire({
            title: "Are you sure to remove this user?",
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
                    text: "The user has been deleted.",
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: "the user comment is safe!",
                    text: "something went wrong",
                    icon: "error"
                });
            }
        });
    }
    return (
        <div className="flex" style={{ minHeight: "calc(100vh - (72px +  48px))" }}>
            <AdminSideBar />
            <div className="flex flex-col justify-center w-full overflow-x-auto overflow-y-hidden ">
                <p className="pl-4 mx-2 mt-[2.1rem] text-2xl">Comments</p>
                <div className="mx-6 w-[1000px] min-h-[330px] text-center my-2  ">
                    <table className="w-full h-full ">
                        <thead>
                            <tr className="">
                                <th>Count</th>
                                <th>User</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map(item => (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>
                                        <div className="flex items-center justify-start gap-2 img w-[260px] pl-4">
                                            <img className="w-10 rounded-full" src="/assets/images/user-avatar.png" />
                                            <span>Youcef Abbas</span>
                                        </div>
                                    </td>
                                    <td>keep going i like this post</td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2 text-white w-[260px]">
                                        <div className="flex items-center justify-center gap-2 text-white w-[260px] mx-auto">
                                            <button className="px-3 py-1 bg-red-400 rounded-xl" onClick={() => removeHandler()}>
                                                <Link >
                                                    Delete Comment
                                                </Link>
                                            </button>
                                        </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CommentsTable