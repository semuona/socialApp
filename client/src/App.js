import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Home} />
        <Route component={Unknown} />
      </Switch>
      <Footer />
    </div>
  );
}

function Unknown() {
  return <div>Error 404 | Page not found!</div>;
}
