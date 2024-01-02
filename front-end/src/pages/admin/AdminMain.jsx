import AddNewCategory from "./AddNewCategory"
import AdminCardLink from "./AdminCardLink"
const AdminMain = () => {
    return (

        <div className="w-full p-6" >

            <div className="flex flex-wrap items-center justify-between gap-1 py-3 pb-4 border-b-2 border-black">
                <AdminCardLink link="users" count="22" />
                <AdminCardLink link="posts" count="202" />
                <AdminCardLink link="categories" count="5" />
                <AdminCardLink link="comments" count="2202" />
            </div>
            <div className="my-5">
                <AddNewCategory />
            </div>

        </div>
    )
}
export default AdminMain