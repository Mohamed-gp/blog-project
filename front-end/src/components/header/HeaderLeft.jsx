import { BsFillPencilFill, BsJustify, BsX } from "react-icons/bs"
import { Link } from "react-router-dom"

const HeaderLeft = ({ toggle, settoggle }) => {
  return (
    <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white header-left logo xl:w-[240px]">
      <div className="text-4xl font-bold cursor-pointer xl:hidden menu " onClick={() => { settoggle(prev => !prev) }}>
        {toggle ? <BsX /> : <BsJustify />}
      </div>
      <Link to="/" className="flex items-center">
        <p className="underline">BLOG</p>
        <BsFillPencilFill />
      </Link>
    </div>
  )
}
export default HeaderLeft