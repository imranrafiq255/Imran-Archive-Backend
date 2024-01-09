const mongoose = require("mongoose");

require("dotenv").config();

const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to MongoDB on host: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = databaseConnection;
