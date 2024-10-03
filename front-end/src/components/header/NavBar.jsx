import { BsHouse, BsJournalPlus, BsPersonCheck, BsStickies } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


const NavBar = ({ toggle, settoggle }) => {
  const user = useSelector(state => state.auth.user)
  return (
    <nav className={`${toggle ? "open" : "closed"} absolute  left-0 flex justify-center w-screen top-full duration-1000 xl:static menu-responsive pb-4 xl:pb-0 xl:w-auto bg-blue-color sm:text-xl text-sm`}>
      <ul className="flex flex-col items-center gap-6 bg-blue-color xl:bg-transparent xl:menu-responsive xl:flex-row">
        <li className="hover:text-main-color">
          <Link to="/" className="flex items-center gap-1" onClick={() => { settoggle(!toggle) }}>
            <BsHouse />
            <p>Home</p>
          </Link>
        </li>
        <li className="hover:text-main-color">
          <Link to="/posts" className="flex items-center gap-1" onClick={() => { settoggle(!toggle) }}>
            <BsStickies />
            <p>Posts</p>
          </Link>
        </li>
        {user && <li className="hover:text-main-color">
          <Link to="/posts/create-post" className="flex items-center gap-1" onClick={() => { settoggle(!toggle) }}>
            <BsJournalPlus />
            <p>Create</p>
          </Link>
        </li>}
        {user?.isAdmin && <li className="hover:text-main-color ">
          <Link to="/admin-dashboard" className="flex items-center gap-1" onClick={() => { settoggle(!toggle) }}>
            <BsPersonCheck />
            <p>Admin Dashboard</p>
          </Link>
        </li>}
      </ul>
    </nav>
  )
}
export default NavBar