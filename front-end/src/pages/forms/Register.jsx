import { useState } from "react"
import { toast } from "react-toastify"
import Title from "../../components/title/Title"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const formOnSubmit = (e) => {
    e.preventDefault()
    if (username.trim() === "") {
      return toast.error("username is required")
    }
    if (email.trim() === "") {
      return toast.error("email is required")
    }
    if (password.trim() === "") {
      return toast.error("password is required")
    }
    return toast.success("Account created")
  }
  return (
    <div className="px-6 contianer" style={{ height: "calc(100vh - (72px +  48px))" ,display : "flex",justifyContent :"center",flexDirection : "column"}}>
      <div className="text-center">
        <Title title="Register" />
      </div>
      <form onSubmit={formOnSubmit} action="" className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto">

        <label  className="w-full font-bold" htmlFor="username">Username : </label>
        <input value={username} type="text" id="username" className="w-full h-10 pl-4 rounded-xl" placeholder="Your username" onChange={(e) => { setusername(e.target.value) }} />
        <label className="w-full font-bold" htmlFor="email">Email : </label>
        <input value={email} id="email" type="text" className="w-full h-10 pl-4 rounded-xl" placeholder="Your email" onChange={(e) => { setemail(e.target.value) }} />
        <label className="w-full font-bold" htmlFor="password">Password : </label>

        <input id="password" value={password} type="password" className="w-full h-10 pl-4 rounded-xl" placeholder="Your password" onChange={(e) => { setpassword(e.target.value) }} />

        <input type="submit" value="Create" className="w-full h-10 font-bold text-white rounded-xl bg-blue-color" />
      </form>
      <div className="my-6 text-center">
        Already have an account ?
        <Link to="/login" className="font-bold text-primary-color"> Login</Link>
      </div>
     
    </div>
  )
}
export default Register