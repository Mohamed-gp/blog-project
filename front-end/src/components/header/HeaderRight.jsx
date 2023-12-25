import { BsArrowRight, BsPersonAdd } from "react-icons/bs"
import { Link } from "react-router-dom"

const HeaderRight = () => {
  return (
    <div className="flex items-center gap-2 right-header">
          <Link className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg cursor-pointer text-blue-color">
            <BsArrowRight />
            <p>Login</p>
          </Link>
          <Link className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg cursor-pointer text-blue-color">
            <BsPersonAdd />
            <p>Register</p>
          </Link>
        </div>
  )
}
export default HeaderRight