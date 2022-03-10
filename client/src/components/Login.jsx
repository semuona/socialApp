import { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SocialAppContext } from "./Context";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const { setUsers, setLoggedInUser } = useContext(SocialAppContext);

  const history = useHistory();

  const handleClick = async () => {
    console.log("data is", data);
    if (!data.pass) return;

    const response = await axios.post("/users/login", data);

    console.log("response is ", response);

    if (response.data.success) {
      setLoggedInUser(response.data.user);
      history.push("/home");
    }
  };

  const container = {
    padding: "40px",
    height: "60vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarIcon = { backgroundColor: "blue" };
  const btn = { marginTop: "40px", marginBottom: "30px" };
  return (
    <Grid>
      <Paper elevation={20} style={container}>
        <Grid align="center">
          <Avatar style={avatarIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log in!</h2>
        </Grid>
        <TextField
          label="Email adress"
          placeholder="Enter email"
          fullWidth
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
          id="email"
          value={data.email}
        />
        OR
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          onChange={(e) => setData({ ...data, username: e.target.value })}
          id="username"
          value={data.username}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setData({ ...data, pass: e.target.value })}
          id="password"
          value={data.pass}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btn}
          fullWidth
          onClick={handleClick}
        >
          Log in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          You don't have an account ?
          <Link href="/Register">Register here!</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
