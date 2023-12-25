import { BsHouse, BsJournalPlus, BsPersonCheck, BsStickies } from "react-icons/bs"
import { Link } from "react-router-dom"

const Nav = ({toggle,settoggle}) => {
  return (
    <nav className={`${toggle ? "open" : "closed"} absolute  left-0 flex justify-center w-screen top-full duration-1000 lg:static menu-responsive pb-4 lg:pb-0 lg:w-auto bg-blue-color sm:text-xl text-sm`}>
    <ul className="flex flex-col items-center gap-6 bg-blue-color lg:bg-transparent lg:menu-responsive lg:flex-row">
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
  )
}
export default Nav