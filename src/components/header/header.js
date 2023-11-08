import React from "react";
import "./header.css";
import logo from "../../assets/Xogene_logo.png";

const Header = () => {
  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="logo" width={100} height={30} />
      <div className="content">Welcome to Xogene Drug Search App</div>
    </div>
  );
};

export default Header;
