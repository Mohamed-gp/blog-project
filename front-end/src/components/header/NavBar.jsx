import { BsHouse, BsJournalPlus, BsPersonCheck, BsStickies } from "react-icons/bs"
import { Link } from "react-router-dom"

const NavBar = ({toggle,settoggle}) => {
  return (
    <nav className={`${toggle ? "open" : "closed"} absolute  left-0 flex justify-center w-screen top-full duration-1000 lg:static menu-responsive pb-4 lg:pb-0 lg:w-auto bg-blue-color sm:text-xl text-sm`}>
    <ul className="flex flex-col items-center gap-6 bg-blue-color lg:bg-transparent lg:menu-responsive lg:flex-row">
      <li className="hover:text-main-color">
        <Link to="/" className="flex items-center gap-1" onClick={() => {settoggle(!toggle)}}>
          <BsHouse />
          <p>Home</p>
        </Link>
      </li>
      <li className="hover:text-main-color">
        <Link to="/posts" className="flex items-center gap-1" onClick={() => {settoggle(!toggle)}}>
          <BsStickies />
          <p>Posts</p>
        </Link>
      </li>
      <li className="hover:text-main-color">
        <Link to="/posts/create-post" className="flex items-center gap-1" onClick={() => {settoggle(!toggle)}}>
          <BsJournalPlus />
          <p>Create</p>
        </Link>
      </li>
      <li className="hover:text-main-color ">
        <Link to="/admin-dashboard" className="flex items-center gap-1" onClick={() => {settoggle(!toggle)}}>
          <BsPersonCheck />
          <p>Admin Dashboard</p>
        </Link>
      </li>
    </ul>
  </nav>
  )
}
export default NavBar