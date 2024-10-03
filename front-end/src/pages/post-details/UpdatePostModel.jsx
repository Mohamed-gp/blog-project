import { useEffect, useState } from "react"
import { BsX } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { updatePostInfo } from "../../redux/apiCalls/postsApiCall"
import { getCategories } from "../../redux/apiCalls/categoriesCall"

const UpdatePostModel = ({ setisOpenModel , post }) => {
    const dispatch = useDispatch()
    const [postTitle,setpostTitle] = useState(post.title)
    const [postDescription,setpostDescription] = useState(post.description)
    const [postCategory,setpostCategory] = useState(post.category)
    const categories = useSelector(state => state.categoriesReducer.categories)
    useEffect(() => {
        dispatch(getCategories())
    })
    const formOnSubmitHandler = (e) => {
        e.preventDefault()

        if (postTitle.trim() === "") {
            return toast.error("invalid post title")
        }
        if (postDescription.trim() === "") {
            return toast.error("invalid post description")
        }
        if (postCategory.trim() === "") {
            return toast.error("invalid post category")
        }
        dispatch(updatePostInfo(post._id,{title : postTitle,description : postDescription,category : postCategory}))
        
    }
    return (
        <>
            <div onClick={() => { setisOpenModel(prev => !prev) }} className="fixed z-40 w-screen h-screen text-white -translate-x-1/2 -translate-y-1/2 bg-[#000000cf] top-1/2 left-1/2">
            </div>
            <div className="fixed z-50 border-4 border-black border-solid b-g-white sm:h-[400px] bg-white  text-black sm:w-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 w-[320px] h-[420px]">
                <p className="mt-5 font-bold text-center">Update Post Model</p>
                <form onSubmit={formOnSubmitHandler} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto my-4 ">
                    <input onChange={(e) => {setpostTitle(e.target.value)}} value={postTitle} type="text" className="w-full h-10 pl-4 border border-solid rounded-xl" placeholder="Post Title"  />
                    <select value={postCategory} onChange={(e) => {setpostCategory(e.target.value)}} className="w-full h-10 pl-4 border border-solid rounded-xl" >
                        <option disabled >Select A Category</option>
                        {categories?.map(category => (
                            <option value={category.title} key={category._id}>{category.title}</option>
                        ))}
                    </select>
                    <textarea value={postDescription} onChange={(e) => {setpostDescription(e.target.value)}}  name="" id="" className="w-full pt-4 pl-4 border border-solid resize-none h-36 rounded-xl" placeholder="Post Description"></textarea>
                    <input type="submit" value="Update" className="self-end w-full h-10 font-bold text-white border border-solid rounded-xl bg-blue-color" />
                </form>
                <div onClick={() => {setisOpenModel(prev => !prev) }} className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-red-color -top-4 -right-4">
                    <BsX className="text-3xl" />
                </div>
                {/* <p>This is an example <abbr title="Hypertext Markup Language">HTML</abbr> document.</p> */}

            </div>
        </>
    )
}
export default UpdatePostModel