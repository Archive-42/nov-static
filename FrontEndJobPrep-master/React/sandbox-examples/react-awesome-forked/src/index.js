import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { FooComponent } from "./mixin.js";
import { HocComponent, toUpperCaseHoc } from "./hoc.js";
import { CountComponent, HookComponent } from "./hook.js";

import { LineChart } from "./chart/d3.js";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox boost </h1>
      <h2>Start editing to see some magic happen!</h2>

      <div id="foo" />

      <div id="hoc" />
      <div id="hocupper" />

      <div id="count" />
      <div id="hook" />

      <div id="line" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

const fooElement = document.getElementById("foo");
ReactDOM.render(<FooComponent />, fooElement);

const hocElement = document.getElementById("hoc");
ReactDOM.render(<HocComponent text="hello, hoc" />, hocElement);

const hocUpElement = document.getElementById("hocupper");
const HocUpComponent = toUpperCaseHoc(HocComponent);
ReactDOM.render(<HocUpComponent text="hello, hoc" />, hocUpElement);

const countElement = document.getElementById("count");
ReactDOM.render(<CountComponent />, countElement);

const hookElement = document.getElementById("hook");
ReactDOM.render(<HookComponent />, hookElement);

let data = {
  points: [
    [
      { x: 0, y: 20 },
      { x: 1, y: 30 },
      { x: 2, y: 10 },
      { x: 3, y: 5 },
      { x: 4, y: 8 },
      { x: 5, y: 15 },
      { x: 6, y: 10 }
    ],
    [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 20 },
      { x: 3, y: 12 },
      { x: 4, y: 4 },
      { x: 5, y: 6 },
      { x: 6, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 5 },
      { x: 2, y: 8 },
      { x: 3, y: 2 },
      { x: 4, y: 6 },
      { x: 5, y: 4 },
      { x: 6, y: 2 }
    ]
  ],
  xValues: [0, 1, 2, 3, 4, 5, 6],
  yMin: 0,
  yMax: 30
};

const lineElement = document.getElementById("line");
ReactDOM.render(
  <LineChart data={data} width={600} height={300} />,
  lineElement
);
