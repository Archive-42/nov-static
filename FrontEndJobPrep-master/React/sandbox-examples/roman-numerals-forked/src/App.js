import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RomanInputs from "./roman-inputs";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RomanInputs />
      </header>
    </div>
  );
}
