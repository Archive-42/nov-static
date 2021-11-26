import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//render everything inside of app to root html element.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")// only element inside of html body
);
