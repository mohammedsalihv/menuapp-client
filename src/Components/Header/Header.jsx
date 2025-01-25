import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3 className="Logo"> MENU APP</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <Link to={"/menu"}>
          <a href="/#">Menu</a>
        </Link>
        <a href="/#">About</a>
        <a href="/#">Contact</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      {!isNavbarOpen && (
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      )}
    </header>
  );
};

export default Header;
