const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
app.use(cookieParser());
app.use(
  cors({
    origin: "https://imran-archive.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const Admin = require("./routes/Admin.routes");
const File = require("./routes/File.routes");
app.use("/api/v1/admin", Admin);
app.use("/api/v1/file", File);

module.exports = app;
