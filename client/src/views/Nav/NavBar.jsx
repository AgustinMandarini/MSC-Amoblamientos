import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className={style.navBar}>
      <div className={style.divLinks}>
        <p className={style.logo}>LOGO</p>
        <Link to="/home" className={style.links}>
          Home
        </Link>
        <Link to="/create" className={style.links}>
          Form
        </Link>
        <Link to="/about" className={style.links}>
          About
        </Link>
      </div>
      <div className={style.searchBar}>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
