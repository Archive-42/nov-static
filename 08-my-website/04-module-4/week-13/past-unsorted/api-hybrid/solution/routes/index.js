const express = require("express");
const router = express.Router();

// Define a route.
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/log-in", (req, res) => {
  res.render("log-in");
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;
