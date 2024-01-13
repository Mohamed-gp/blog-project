
import { useState } from "react"
import { BsX, BsXCircle } from "react-icons/bs"
import { toast } from "react-toastify"
import { editUserProfile } from "../../redux/apiCalls/profileApiCall"
import { useDispatch } from "react-redux"

const UpdateProfileModel = ({ setisOpenModel,profile }) => {
    const dispatch = useDispatch()
    const [username, setusername] = useState(profile.username)
    const [bio, setbio] = useState(profile.bio)
    const [password, setpassword] = useState("")
    const formOnSubmit = (e) => {
        e.preventDefault()
        if (bio.trim() === "") {
            return toast.error("bio musn't be empty")
        }
        if (username.trim() === "") {
            return toast.error("username musn't be empty")
        }
        const updatedUser = {
            username : username,
            bio : bio
        }
        if (password.trim() !== "") {
            updatedUser.password = password
        }
        dispatch(editUserProfile(profile._id,updatedUser))
        return toast.success("profile information updated succefuly")
    }
    return (
        <>
            <div onClick={() => { setisOpenModel(prev => !prev) }} className="fixed z-40 w-screen h-screen text-white -translate-x-1/2 -translate-y-1/2 bg-[#000000cf] top-1/2 left-1/2">
            </div>
            <div className="fixed z-50 border-4 border-black border-solid b-g-white sm:h-[400px] bg-white  text-black sm:w-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 w-[320px] h-[420px]">
                <p className="mt-5 font-bold text-center">Update Profile</p>
                <form onSubmit={formOnSubmit} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto my-4 ">
                    <input value={username} onChange={(e) => {setusername(e.target.value)}} type="text" className="w-full h-10 pl-4 border border-solid rounded-xl" placeholder="Profile Username" />
                    <textarea value={bio} onChange={(e) => { setbio(e.target.value) }} name="" id="" className="w-full pt-4 pl-4 border border-solid resize-none h-36 rounded-xl" placeholder="Post Description"></textarea>
                    <input value={password} onChange={(e) => {setpassword(e.target.value)}} type="text" className="w-full h-10 pl-4 border border-solid rounded-xl" placeholder="Profile Password" />
                    <input type="submit" value="Create" className="self-end w-full h-10 font-bold text-white border border-solid rounded-xl bg-blue-color" />
                </form>
                <div onClick={() => { setisOpenModel(prev => !prev) }} className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-red-color -top-4 -right-4">
                    <BsX className="text-3xl" />
                </div>
                {/* <p>This is an example <abbr title="Hypertext Markup Language">HTML</abbr> document.</p> */}
            </div>
        </>
    )
}
export default UpdateProfileModel