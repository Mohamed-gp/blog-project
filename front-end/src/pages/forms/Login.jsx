import { useState } from "react"
import { toast } from "react-toastify"
import Title from "../../components/title/Title"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const formOnSubmit = (e) => {
    e.preventDefault()

    if (email.trim() === "") {
      return toast.error("email is required")
    }
    if (password.trim() === "") {
      return toast.error("password is required")
    }
    return toast.success("Account verified Welcome")
  }
  return (
    <div className="px-6 contianer" style={{ height: "calc(100vh - (72px +  48px))" ,display : "flex",justifyContent :"center",flexDirection : "column"}}>
      <div className="text-center">
        <Title title="Login" />
      </div>
      <form onSubmit={formOnSubmit} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto">
        <label className="w-full font-bold" htmlFor="email">Email : </label>
        <input value={email} id="email" type="text" className="w-full h-10 pl-4 rounded-xl" placeholder="Your email" onChange={(e) => { setemail(e.target.value) }} />
        <label className="w-full font-bold" htmlFor="password">Password : </label>
        <input value={password} id="password" type="password" className="w-full h-10 pl-4 rounded-xl" placeholder="Your password" onChange={(e) => { setpassword(e.target.value) }} />
        <input type="submit" value="Create" className="w-full h-10 font-bold text-white rounded-xl bg-blue-color" />
      </form>
      <div className="flex justify-center gap-3 my-6 text-center ">
        <Link to="/register" className="font-bold duration-500 text-primary-color hover:text-blue-color">Create Account</Link>
        <p>_</p>
        <Link to="/forget-password" className="font-bold duration-500 text-primary-color hover:text-blue-color">Forgot Password</Link>
      </div>
    </div>
  )
}
export default Login