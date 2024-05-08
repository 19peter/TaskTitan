import React from "react";
import "../../styles/Navbar.css";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ display: "flex" , flexDirection:"column", backgroundColor:"beige"}}>
      <div>
        {" "}
        <header className="header">
          <img
            className="logo"
            src={"movie14.png"}
            style={{ height: "160%", width: "23%", marginLeft: "0px" }}
            alt="Logo"
          />
          <nav className="navbar">
            {/* <Link to="/home">Home</Link> */}
            {/* <Link to="/about">About</Link> */}
            {/* <Link to="/profile">Profile</Link> */}
          </nav>
        </header>
      </div>
      <div style={{marginTop:"100px"}}>
        {" "}
        <Outlet></Outlet>
      </div>{" "}
    </div>
  );
};

export default Navbar;
