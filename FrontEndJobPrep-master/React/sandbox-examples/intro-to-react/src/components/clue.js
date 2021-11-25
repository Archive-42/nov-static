import React from "react";
const Clue = () =>
  React.createElement(
    "section",
    { className: "clue" },
    React.createElement("h1", { className: "clue__title" }, "Title"),
    React.createElement("div", { className: "clue__question" }, "?"),
    React.createElement("div", { className: "clue__category" }, "Category"),
    React.createElement("div", { className: "clue__amount" }, "$800")
  );
