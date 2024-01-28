import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSideBar"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/apiCalls/categoriesCall";
import { deleteCategory } from "../../redux/apiCalls/adminApiCall";

const CategoriesTable = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoriesReducer.categories)
    useEffect(() => {
        dispatch(getCategories())
    })
    const removeHandler = (categoryId) => {
        
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
                dispatch(deleteCategory(categoryId))
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success"
              });
            }
            else{
                Swal.fire({
                    title: "the category is safe!",
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
                <p className="pl-4 mx-2 mt-[2.1rem] text-2xl">Categories</p>
                <div className="mx-6 w-[1000px] min-h-[330px] text-center my-2  ">
                    <table className="w-full h-full ">
                        <thead>
                            <tr className="">
                                <th>Count</th>
                                <th>Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category,index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2 text-white w-[260px] mx-auto">
                                            <button className="px-3 py-1 bg-red-400 rounded-xl" onClick={() => removeHandler(category?._id)}>
                                                    Delete Category
                                            </button>
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
export default CategoriesTable