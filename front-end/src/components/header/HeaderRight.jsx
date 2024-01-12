import { BsArrow90DegDown, BsArrowBarDown, BsArrowDown, BsArrowDownLeft, BsArrowRight, BsDoorOpenFill, BsPersonAdd, BsPersonFill, BsTriangle, BsTriangleFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { logoutUser } from "../../redux/apiCalls/authApiCall"

const HeaderRight = () => {
  const user = useSelector(state => state.auth.user)
  
  const dispatch = useDispatch()
  const [dropDownOpen, setdropDownOpen] = useState(false)
  // const { user } = useSelector(state => state.auth)
  return (

    <div className="flex items-center gap-2 font-bold right-header lg:w-[240px] text-sm sm:text-lg">
      {user ?
      (
        <>
          <div className="relative flex items-center gap-1 lg:gap-2">
            <div className="w-[15px] flex justify-center ">

              {dropDownOpen ? <BsTriangleFill onClick={() => { setdropDownOpen(false) }} className="cursor-pointer text-[10px]  duration-500" /> :
                <BsTriangleFill className="text-[10px] rotate-180 cursor-auto duration-500" onClick={() => { setdropDownOpen(true) }} />}
            </div>
            <p>{user.username}</p>
            <div>
              {/*
               user is an object that likely represents a user's information. The ? symbol is called the optional chaining operator. It is used to safely access properties of an object that may be null or undefined. 
                <img src={user?.profilePhoto.url} alt={user.username} className="w-8 h-8 rounded-full lg:w-12 lg:h-12 " />
                In this case, user?.profilePhoto.url is accessing the profilePhoto.url property of the user object. If the user object is null or undefined, the expression will short-circuit and return undefined instead of throwing an error. 
              */}
              <img src={user.profilePhoto.url} alt={user.username} className="w-8 h-8 rounded-full lg:w-12 lg:h-12 " />
            </div>
            {dropDownOpen &&
              <div className="drop-down-profile z-10 absolute -left-[50px] top-[63px] bg-blue-color text-[18px] px-[25px] py-2 leading-loose rounded-3xl">
                <Link to={`/profile/${user._id}`} onClick={() => {setdropDownOpen(false)}}  className="flex items-center gap-2 duration-500 cursor-pointer hover:text-yellow-300">
                  <BsPersonFill />
                  <p>Account</p>
                </Link>
                <div onClick={() => {setdropDownOpen(false);dispatch(logoutUser())}} className="flex items-center gap-2 duration-500 cursor-pointer hover:text-yellow-300">
                  <BsDoorOpenFill />
                  <p>Log Out</p>
                </div>
              </div>
            }
          </div>
        </> ):
        (
          <>
            <Link to="/login" className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-black border-solid rounded-lg cursor-pointer text-blue-color">
              <BsArrowRight />
              <p>Login</p>
            </Link>
            <Link to="/register" className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-black border-solid rounded-lg cursor-pointer text-blue-color">
              <BsPersonAdd />
              <p>Register</p>
            </Link>
          </>
        )
      }
    </div>

  )
}
export default HeaderRight