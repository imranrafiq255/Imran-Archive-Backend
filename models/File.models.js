const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: String,
    fileURL: String,
  },
  { timestamps: true }
);

const fileModel = mongoose.model("File", fileSchema);

module.exports = fileModel;
