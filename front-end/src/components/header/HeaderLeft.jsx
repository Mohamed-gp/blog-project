import { BsFillPencilFill, BsJustify, BsX } from "react-icons/bs"

const HeaderLeft = ({toggle,settoggle}) => {
  return (
    <div className="flex items-center gap-4 text-2xl font-bold text-white header-left logo">
          <div className="text-4xl font-bold cursor-pointer lg:hidden menu " onClick={() => { settoggle(prev => !prev) }}>
            {toggle ?  <BsX/> : <BsJustify />}
          </div>
          <div className="flex items-center">
            <p className="underline">BLOG</p>
            <BsFillPencilFill />
          </div>
        </div>
  )
}
export default HeaderLeft