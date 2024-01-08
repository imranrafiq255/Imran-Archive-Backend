const fileModel = require("../models/File.models");
const cloudinary = require("cloudinary").v2;
exports.uploadFile = async (req, res) => {
  const { fileName } = req.body;
  const file = req.file;

  if (!fileName || !file) {
    return res.status(400).json({
      success: false,
      message: "Either file name or file is missing",
    });
  }
  try {
    const validatedFileName = String(fileName);
    const fileUpload = await cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        use_filename: true,
        unique_filename: true,
        format: file.originalname,
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error.message);
          return res.status(500).json({
            success: false,
            error: `Error uploading file to Cloudinary. ${error.message}`,
          });
        }

        await fileModel.create({
          fileName: validatedFileName,
          fileURL: result.secure_url,
        });

        return res.status(201).json({
          success: true,
          url: result.secure_url,
          message: "File is saved into the database",
        });
      }
    );

    await fileUpload.end(file.buffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loadAllFiles = async (req, res) => {
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
};
