import { BsArrowRight, BsPersonAdd } from "react-icons/bs"
import { Link } from "react-router-dom"

const HeaderRight = () => {
  return (
    <div className="flex items-center gap-2 font-bold right-header lg:w-[240px] text-sm sm:text-lg">
          <Link to="/login" className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-black border-solid rounded-lg cursor-pointer text-blue-color">
            <BsArrowRight />
            <p>Login</p>
          </Link>
          <Link to="/register" className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-black border-solid rounded-lg cursor-pointer text-blue-color">
            <BsPersonAdd />
            <p>Register</p>
          </Link>
        </div>
  )
}
export default HeaderRight