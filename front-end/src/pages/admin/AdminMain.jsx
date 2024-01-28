import { useDispatch, useSelector } from "react-redux"
import AddNewCategory from "./AddNewCategory"
import AdminCardLink from "./AdminCardLink"
import { useEffect } from "react"
import { getCategories } from "../../redux/apiCalls/categoriesCall"
import { getPostsCount } from "../../redux/apiCalls/postsApiCall"
import { getComments, getUsersCount } from "../../redux/apiCalls/adminApiCall"
const AdminMain = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoriesReducer.categories)
    const postsCount = useSelector(state => state.postsReducer.postsCount)
    const usersCount = useSelector(state => state.adminReducer.usersCount)
    const comments = useSelector(state => state.adminReducer.comments)
    
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getPostsCount())
        dispatch(getUsersCount())
        dispatch(getComments())
    },[])
    return (

        <div className="w-full p-6" >

            <div className="flex flex-wrap items-center justify-between gap-1 py-3 pb-4 border-b-2 border-black">
                <AdminCardLink link="users" count={usersCount} />
                <AdminCardLink link="posts" count={postsCount} />
                <AdminCardLink link="categories" count={categories?.length} />
                <AdminCardLink link="comments" count={comments?.length} />
            </div>
            <div className="my-5">
                <AddNewCategory />
            </div>

        </div>
    )
}
export default AdminMain