import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import NavBar from "./NavBar";



const Header = () => {
  const [toggle, settoggle] = useState(false)
  return (
    <header className="relative px-4 text-white bg-blue-color lg:text-xl">
      <div className="container flex items-center justify-between py-4">
        <HeaderLeft toggle={toggle} settoggle={settoggle}/>
        <NavBar toggle={toggle} settoggle={settoggle}/>
        <HeaderRight/>
      </div>
    </header>
  )
}
export default Header