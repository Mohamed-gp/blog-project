import { useState } from "react"
import { BsX, BsXCircle } from "react-icons/bs"
import { toast } from "react-toastify"

const UpdateCommentModel = ({ setcommentPostModel }) => {
    const [commentText,setcommentText] = useState("")
    const formOnSubmitHandler = (e) => {
        e.preventDefault()
        if (commentText.trim() === "") {
            return toast.error("enter a non empty comment")
        }

        return toast.success("post changed succefuly")
    }
    return (
        <>
            <div onClick={() => { setcommentPostModel(prev => !prev) }} className="fixed z-40 w-screen h-screen text-white -translate-x-1/2 -translate-y-1/2 bg-[#000000cf] top-1/2 left-1/2">
            </div>
            <div className="fixed z-50 border-4 border-black border-solid b-g-white sm:h-[200px] bg-white  text-black sm:w-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 w-[320px] h-[220px]">
                <p className="mt-5 font-bold text-center">Update Comment Model</p>
                <form onSubmit={formOnSubmitHandler} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto my-4 ">
                    <input onChange={(e) => {setcommentText(e.target.value)}} type="text" className="w-full h-10 pl-4 border border-solid rounded-xl" placeholder="Enter Your Updated Comment" />
                    <input type="submit" value="Create" className="self-end w-full h-10 font-bold text-white border border-solid rounded-xl bg-blue-color" />
                </form>
                <div onClick={() => { setcommentPostModel(prev => !prev) }} className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-red-color -top-4 -right-4">
                    <BsX className="text-3xl" />
                </div>
                {/* <p>This is an example <abbr title="Hypertext Markup Language">HTML</abbr> document.</p> */}

            </div>
        </>
    )
}
export default UpdateCommentModel