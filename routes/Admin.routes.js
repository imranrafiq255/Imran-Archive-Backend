const {
  createAdmin,
  adminLogIn,
  loadAdmin,
} = require("../controllers/Admin.controllers");
const express = require("express");
const Router = express.Router();
const isAuthenticated = require("../middlewares/auth");
Router.route("/createadmin").post(createAdmin);
Router.route("/login").post(adminLogIn);
Router.route("/loadadmin").get(isAuthenticated, loadAdmin);

module.exports = Router;
