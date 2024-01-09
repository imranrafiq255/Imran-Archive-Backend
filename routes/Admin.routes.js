const {
  createAdmin,
  adminLogIn,
  loadAdmin,
  signOut,
} = require("../controllers/Admin.controllers");
const express = require("express");
const Router = express.Router();
const isAuthenticated = require("../middlewares/auth");
Router.route("/createadmin").post(createAdmin);
Router.route("/login").post(adminLogIn);
Router.route("/loadadmin").get(isAuthenticated, loadAdmin);
Router.route("/signout").get(isAuthenticated, signOut);

module.exports = Router;
