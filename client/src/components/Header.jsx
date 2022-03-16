import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { SocialAppContext } from "./Context";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    fontFamily: "Allura",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

export default function Header() {
  const { setUsers, setLoggedInUser, loggedInUser } = useContext(SocialAppContext);
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("authorizedUser");
    history.push("/Login");
    setLoggedInUser("");
  };

  const style = {
    width: "80px",
    height: "30px",
    marginLeft: "150px",
  };

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <span style={{marginRight:"700px"}}>Instagram</span>
        </Typography>
        <div className={classes.navlinks}>
          <NavLink to="/" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="Profile" className={classes.link}>
            Profile
          </NavLink>

          {loggedInUser ? (
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              style={style}
              onClick={handleLogout}
            >
              <span style={{marginLeft:"40px", fontWeight:"bold"}}>Logout</span>
            </Button>
          ) : (
            <>
              <NavLink to="/Login" className={classes.link}>
                Login
              </NavLink>
              <NavLink to="/Register" className={classes.link}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
