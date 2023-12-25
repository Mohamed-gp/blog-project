import { Link } from "react-router-dom"
import photo from "../../assets/images/user-avatar.png"
import { BsJustify, BsFillPencilFill, BsHouse, BsJournalPlus, BsPersonCheck, BsStickies, BsPersonAdd, BsArrow90DegRight, BsArrowRight, BsX } from "react-icons/bs";
import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Nav from "./Nav";



const Header = () => {
  const [toggle, settoggle] = useState(false)
  return (
    <header className="relative px-4 text-white bg-blue-color lg:text-xl">
      <div className="container flex items-center justify-between py-4">
        <HeaderLeft toggle={toggle} settoggle={settoggle}/>
        <Nav toggle={toggle} settoggle={settoggle}/>
        <HeaderRight/>
      </div>
    </header>
  )
}
export default Header