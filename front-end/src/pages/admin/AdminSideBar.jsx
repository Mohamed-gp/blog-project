import { BsBarChartSteps, BsBookmarkFill, BsChatRightTextFill, BsFileEarmarkRichtextFill, BsPersonCircle } from "react-icons/bs"
import Title from "../../components/title/Title"
import { Link, NavLink } from "react-router-dom"

const AdminSideBar = () => {
    return (
        <div className="hidden sm:block sm:min-w-[240px] p-6 border-solid border-r-2 border-[#fffb94]" >
            <Link to="/admin-dashboard" className="flex items-center gap-2 ">
                <BsBarChartSteps className="text-xl text-green-color"/>
                <p className="py-3 text-xl font-bold">Dashboard</p>
            </Link>
            <div className="flex flex-col gap-5 ml-4 text-primary-color">
                <NavLink to="/admin-dashboard/users-table" className="flex items-center gap-2 py-2 pl-2 text-xl duration-500 rounded-xl admin-link ">
                    <BsPersonCircle />
                    <p>
                        Users
                    </p>
                </NavLink>
                <NavLink to="/admin-dashboard/posts-table"  className="flex items-center gap-2 py-2 pl-2 text-xl duration-500 rounded-xl admin-link">
                    <BsFileEarmarkRichtextFill />
                    <p>

                        Posts
                    </p>
                </NavLink>
                <NavLink to="/admin-dashboard/categories-table"  className="flex items-center gap-2 py-2 pl-2 text-xl duration-500 rounded-xl admin-link">
                    <BsBookmarkFill />
                    <p>

                        Categories
                    </p>
                </NavLink>
                <NavLink to="/admin-dashboard/comments-table"  className="flex items-center gap-2 py-2 pl-2 text-xl duration-500 rounded-xl admin-link">
                    <BsChatRightTextFill />
                    <p>
                        Comments
                    </p>
                </NavLink>
                

            </div>
        </div>
    )
}
export default AdminSideBar