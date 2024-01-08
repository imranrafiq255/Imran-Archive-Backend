const { createAdmin, adminLogIn } = require("../controllers/Admin.controllers");
const express = require("express");
const Router = express.Router();

Router.route("/createadmin").post(createAdmin);
Router.route("/login").post(adminLogIn);
module.exports = Router;
