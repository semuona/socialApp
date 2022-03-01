import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContext from "./components/Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <AppContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContext>,

  document.getElementById("root")
);

reportWebVitals();


