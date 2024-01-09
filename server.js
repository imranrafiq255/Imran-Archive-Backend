const app = require("./app");
const cloudinary = require("cloudinary").v2;
const fileModel = require("./models/File.models");
const port = process.env.SERVER_PORT || 6500;
const databaseConnection = require("./config/database");
databaseConnection();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
