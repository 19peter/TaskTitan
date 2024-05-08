import React from "react";
import "../../styles/Navbar.css";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <div>
          {" "}
          <header className="header">
            {/* <img
              className="logo"
              src={"movie14.png"}
              style={{ height: "160%", width: "23%", marginLeft: "0px" }}
              alt="Logo"
            /> */}

            <h1 style={{color:'white'}}>TaskTitan</h1>
            <nav className="navbar">
              {/* <Link to="/home">Home</Link> */}
              {/* <Link to="/about">About</Link> */}
              {/* <Link to="/profile">Profile</Link> */}
            </nav>
          </header>
        </div>
      </div>

      <div style={{ marginTop: "97px", height: "100%" }}>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Navbar;
