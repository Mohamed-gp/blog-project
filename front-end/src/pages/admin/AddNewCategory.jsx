import { useState } from "react"
import { toast } from "react-toastify"

const AddNewCategory = () => {
    const [category,setcategory] = useState("")
    const formOnSubmitHandler = (e) => {
        e.preventDefault()
        if (category.trim() === "") {
            return toast.error("category musn't be empty")
        }
        return toast.success("category added succefuly")
    }
    return (
        <form onSubmit={formOnSubmitHandler} action="" className="flex gap-2 flex-col lg:w-[450px]  mx-auto border-black border-2 rounded-xl p-3" >
            <p className="font-bold">Add New Category</p>
            <label htmlFor="categoryTitle" className="text-sm text-primary-color" >Category Title</label>
            <input value={category} onChange={(e) => {setcategory(e.target.value)}} type="text" id="categoryTitle" className="w-full h-10 pl-4 rounded-xl" placeholder="Enter Category Title" />
            <input type="submit"  className="w-full h-10 font-bold text-white rounded-xl bg-green-color" />
        </form>
    )
}
export default AddNewCategory