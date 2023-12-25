import { Link } from "react-router-dom"
import photo from "../../assets/images/user-avatar.png"
import { BsJustify, BsFillPencilFill, BsHouse, BsJournalPlus, BsPersonCheck, BsStickies, BsPersonAdd, BsArrow90DegRight, BsArrowRight, BsX } from "react-icons/bs";
import { useState } from "react";



const Header = () => {
  const [toggle, settoggle] = useState(false)
  return (
    <header className="relative px-4 text-white bg-blue-color lg:text-xl">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4 text-2xl font-bold text-white header-left logo">
          <div className="text-4xl font-bold cursor-pointer lg:hidden menu " onClick={() => { settoggle(prev => !prev) }}>
            {toggle ?  <BsX/> : <BsJustify />}
          </div>
          <div className="flex items-center">
            <p className="underline">BLOG</p>
            <BsFillPencilFill />
          </div>
        </div>
        <nav className={`${toggle ? "open" : "closed"} absolute  left-0 flex justify-center w-screen top-full duration-1000 lg:static menu-responsive pb-4 lg:pb-0 lg:w-auto bg-blue-color sm:text-xl text-sm`}>
          <ul className="flex items-center gap-6 bg-blue-color lg:bg-transparent lg:menu-responsive">
            <li className="hover:text-main-color">
              <Link href="/" className="flex items-center gap-1">
                <BsHouse />
                <p>Home</p>
              </Link>
            </li>
            <li className="hover:text-main-color">
              <Link href="/" className="flex items-center gap-1">
                <BsStickies />
                <p>Posts</p>
              </Link>
            </li>
            <li className="hover:text-main-color">
              <Link href="/" className="flex items-center gap-1">
                <BsJournalPlus />
                <p>Create</p>
              </Link>
            </li>
            <li className="hover:text-main-color ">
              <Link href="/" className="flex items-center gap-1">
                <BsPersonCheck />
                <p>Admin Dashboard</p>
              </Link>
            </li>
          </ul>
        </nav>
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
      </div>
    </header>
  )
}
export default Header