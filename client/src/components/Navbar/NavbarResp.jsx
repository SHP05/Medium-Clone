import  { useState } from "react";
import { NavLink } from "react-router-dom";
import './NavbarResp.css'
import AccountMenu from "./Menudropdown";

const Navbar = () => {

  const [menuOpen, setmenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed-top shadow-xl">
        <div className="title d-flex-row">
          <a className="navbar-brand fw-bold fs-3 d-flex" href="/">
            <p>Fellow Post</p>
          </a>
        </div>
       
        <div className="menu" onClick={
          () => {
            setmenuOpen(!menuOpen)
          }
         }>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <AccountMenu />
          </li>
          <li>
            <NavLink to="/home" className="">
              {localStorage.getItem('name')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;