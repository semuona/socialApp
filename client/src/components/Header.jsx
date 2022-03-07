import React from "react";
import "./Style/Header.css";
/* import image from "/home/user/dci/Food-delivery-app/client/src/images/Black Simple Cafe Restaurant Food Logo.png"; */
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { SocialAppContext } from "./Context";

export default function Header() {
  const {setUsers} = useContext(SocialAppContext)
  const history = useHistory();

  const handleLogout = () => {
    setUsers(null);
    history.push("/register");
  };

  const style = {
    width: "98px",
    height: "40px",
  };

  return (
    <header>
      {/*  <div className="logo">
        <NavLink to="/">
          <img src={image} alt="" />
        </NavLink>
      </div> */}
      <ul className="navBar">
        {" "}
        <NavLink className="navItem" to="/">
          <li>Home</li>
        </NavLink>
        <NavLink className="navItem" to="/Login">
          <li>Log in</li>
        </NavLink>
        <NavLink className="navItem" to="/Register">
          <li>Register</li>
        </NavLink>
        <NavLink className="navItem" to="/Profile">
          <li>Profile</li>
        </NavLink>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          style={style}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </ul>
    </header>
  );
}
