import { BsCameraFill, BsPersonFill } from "react-icons/bs"
import Posts from "../../components/posts/Posts"
import { posts } from "../../dummyData"
import { useState } from "react"
import { toast } from "react-toastify"

const Profile = () => {
    const [file,setfile] = useState(null)
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!file) {
            return toast.error("no profile image provided")
        }
        return toast.success("profile image changed succefuly")
    }
    return (
        <div className="container p-6">
            <div className="w-full px-6 text-center text-white bg-primary-color">
                <div className="flex flex-col items-center py-12">
                    <div className="flex flex-col gap-6">
                        <form onSubmit={formSubmitHandler} className="relative img">
                            <img src={file ? URL.createObjectURL(file):"/assets/images/user-avatar.png"} alt="" className="w-20 mx-auto overflow-hidden rounded-full" />
                            <div className="absolute right-0 flex items-center gap-1 -bottom-2">
                                <label htmlFor="file" className="flex items-center justify-center p-1 text-2xl bg-white rounded-full cursor-pointer text-primary-color">
                                    <BsCameraFill/>
                                </label>
                                <button type="submit" className="px-2 text-base font-bold bg-white rounded-lg cursor-pointer text-primary-color">Upload</button>
                                <input type="file" id="file" className="hidden" onChange={(e) => {setfile(e.target.files[0])}}/>
                            </div>
                        </form>
                        <p className="my-2 text-4xl font-bold">Youcef Abbas</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">

                        <div className="flex flex-col items-center ">
                            <p className="text-base bio">it's mohamed a web developer ,with react and node js</p>
                            <p className="font-bold text-[#929292]">Date Joined: <span className="text-green-sea-color">Fri Nov 04 2022</span></p>
                        </div>
                        <button className="flex items-center px-4 py-1 my-2 w-fit rounded-xl bg-green-color">
                            <BsPersonFill />
                            <p>Update Profile</p>
                        </button>
                    </div>
                </div>
            </div>
            <p className="py-6 text-3xl font-bold">Mohamed Posts</p>
            <Posts posts={posts} />
        </div>
    )
}
export default Profile