import { BsCameraFill, BsPersonFill } from "react-icons/bs"
import Posts from "../../components/posts/Posts"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import UpdateProfileModel from "./UpdateProfileModel"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, updateUserPhotoProfile } from "../../redux/apiCalls/profileApiCall"

const Profile = () => {
    const [isOpenModel, setisOpenModel] = useState(false)
    const dispatch = useDispatch()
    const [file, setfile] = useState(null)
    const { id } = useParams()
    const profile = useSelector(state => state.profile.profileInfo)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getUserProfile(id))
    }, [id])


    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!file) {
            return toast.error("no profile image provided")
        }
        const formData = new FormData()
        formData.append("image", file)
        dispatch(updateUserPhotoProfile(formData))

    }
    const deleteHandler = () => {
        Swal.fire({
            title: "Are you sure to delete your profile?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Profile has been deleted.",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "your profile is safe!",
                    text: "something went wrong",
                    icon: "error"
                });
            }
        });
    }
    return (
        <>
            <div>
                <div className="container p-6">
                    <div className="w-full px-6 text-center text-white bg-primary-color">
                        <div className="flex flex-col items-center py-12">
                            <div className="flex flex-col gap-6">
                                <form onSubmit={formSubmitHandler} className="relative img">
                                    <div className="relative mx-auto w-fit">
                                        <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="" className="object-cover w-20 h-20 mx-auto overflow-hidden rounded-full" />
                                        <div className="absolute bottom-0 flex items-center gap-1 right-[-85px]">
                                            <label htmlFor="file" className="flex items-center justify-center p-1 text-2xl bg-white rounded-full cursor-pointer text-primary-color">
                                                <BsCameraFill />
                                            </label>
                                            <button type="submit" className="px-2 text-base font-bold bg-white rounded-lg cursor-pointer text-primary-color">Upload</button>
                                            <input type="file" id="file" className="hidden" onChange={(e) => { setfile(e.target.files[0]) }} />
                                        </div>
                                    </div>
                                </form>
                                <p className="my-2 text-4xl font-bold">{profile?.username}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">

                                <div className="flex flex-col items-center ">
                                    <p className="text-base bio">{profile?.bio}</p>
                                    <p className="font-bold text-[#929292]">Date Joined: <span className="text-green-sea-color">Fri Nov 04 2022</span></p>
                                </div>
                                <button onClick={() => { setisOpenModel(true) }} className="flex items-center px-4 py-1 my-2 w-fit rounded-xl bg-green-color">
                                    <BsPersonFill />
                                    <p>Update Profile</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="py-6 text-3xl font-bold">{profile?.username} Posts</p>
                    {profile?.posts?.length >= 1 ? <Posts posts={profile?.posts} /> : <p>there is no posts found</p>}
                    <p className="text-2xl font-bold underline text-red-color">Danger Zone :</p>
                    <p className="my-2"><span className="font-bold text-red-color">note:</span> Once you delete your account, there is no going back. Please be certain.</p>
                    <div className="flex justify-end">
                        <button onClick={() => { deleteHandler() }} className="px-2 py-1 text-xl font-bold border-2 cursor-pointer w-fit text-red-color border-red-color rounded-xl ">Delete Your Account</button>
                    </div>
                </div>
                {isOpenModel && <UpdateProfileModel setisOpenModel={setisOpenModel} />}
            </div>
        </>

    )
}
export default Profile