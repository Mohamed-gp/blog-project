import { BsBarChartSteps, BsBookmarkFill, BsChatRightTextFill, BsFileEarmarkRichtextFill, BsPersonCircle } from "react-icons/bs"
import Title from "../../components/title/Title"
import { Link } from "react-router-dom"

const AdminSideBar = () => {
    return (
        <div className="hidden sm:block sm:w-[240px] p-6 border-solid border-r-2 border-[#fffb94]" >
            <Link to="/admin-dashboard" className="flex items-center gap-2">
                <BsBarChartSteps className="text-xl text-green-color"/>
                <p className="py-3 text-xl font-bold">Dashboard</p>
            </Link>
            <div className="flex flex-col gap-5 pl-5 text-primary-color">
                <Link to="/admin-dashboard/users-table" className="flex items-center gap-2 text-xl">
                    <BsPersonCircle />
                    <p>
                        Users
                    </p>
                </Link>
                <Link to="/admin-dashboard/posts-table"  className="flex items-center gap-2 text-xl">
                    <BsFileEarmarkRichtextFill />
                    <p>

                        Posts
                    </p>
                </Link>
                <Link to="/admin-dashboard/categories-table"  className="flex items-center gap-2 text-xl">
                    <BsBookmarkFill />
                    <p>

                        Categories
                    </p>
                </Link>
                <Link to="/admin-dashboard/comments-table"  className="flex items-center gap-2 text-xl">
                    <BsChatRightTextFill />
                    <p>
                        Comments
                    </p>
                </Link>
                

            </div>
        </div>
    )
}
export default AdminSideBar