import { toast } from "react-toastify"
import Title from "../../components/title/Title"
import { Link } from "react-router-dom"
import { useState } from "react"

const ForgetPassword = () => {
    const [email, setemail] = useState("")
    const formOnSubmit = (e) => {
        e.preventDefault()

        if (email.trim() === "") {
            return toast.error("email is required")
        }
        return toast.success("verify your email")
    }
    return (
        <div className="px-6 contianer" style={{ height: "calc(100vh - (72px +  48px))" ,display : "flex",justifyContent :"center",flexDirection : "column"}}>
            <div className="text-center">
                <Title title="Login" />
            </div>
            <form onSubmit={formOnSubmit} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto">
                <label className="w-full font-bold" htmlFor="email">Forget Your Password : </label>
                <input value={email} id="email" type="text" className="w-full h-10 pl-4 rounded-xl" placeholder="Your email" onChange={(e) => { setemail(e.target.value) }} />
                <input type="submit" value="Create" className="w-full h-10 font-bold text-white rounded-xl bg-blue-color" />
            </form>
            
        </div>
    )
}
export default ForgetPassword