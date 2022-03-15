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
  const { setUsers, setLoggedInUser } = useContext(SocialAppContext);
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("authorizedUser");
    history.push("/Register");
    window.location.reload(true);
  };

  const style = {
    width: "98px",
    height: "40px",
    marginLeft: "50px",
  };

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Navbar
        </Typography>
        <div className={classes.navlinks}>
          <NavLink to="/" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="Profile" className={classes.link}>
            Profile
          </NavLink>
          <NavLink to="/Register" className={classes.link}>
            Register
          </NavLink>
          <NavLink to="/Login" className={classes.link}>
            Login
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
        </div>
      </Toolbar>
    </AppBar>
  );
}
