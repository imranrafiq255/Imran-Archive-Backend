const { uploadFile, loadAllFiles } = require("../controllers/File.controllers");
const upload = require("../config/fileUpload");
const express = require("express");
const Router = express.Router();
const isAuthenticated = require("../middlewares/auth");
Router.route("/uploadfile").post(
  isAuthenticated,
  upload.single("file"),
  uploadFile
);
Router.route("/loadfiles").get(loadAllFiles);

module.exports = Router;
