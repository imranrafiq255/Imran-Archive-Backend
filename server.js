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
app.get("/", async (req, res) => {
  try {
    const files = await fileModel.find({});
    return res.status(201).json({
      success: true,
      files,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
