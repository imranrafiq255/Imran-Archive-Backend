const { createAdmin, adminLogIn } = require("../controllers/Admin.controllers");
const express = require("express");
const Router = express.Router();

Router.route("/createadmin").post(createAdmin);
Router.route("/login").post(adminLogIn);
Router.route("/malik").get((req, res) => {
  res.send("I am imran malik");
});
module.exports = Router;
