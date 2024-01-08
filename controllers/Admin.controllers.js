const adminModel = require("../models/Admin.models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.createAdmin = async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;
    if (!adminName || !adminEmail || !adminPassword) {
      return res.status(404).json({
        success: false,
        message: "Name, Email or Password is missing",
      });
    }
    await adminModel.create({ adminName, adminEmail, adminPassword });
    return res.status(201).json({
      success: true,
      message: "Admin created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminLogIn = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({
        success: false,
        message: "Either Email or Password is missing",
      });
    }
    const admin = await adminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message:
          "There is no record in the database with this email: " + adminEmail,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      adminPassword,
      admin.adminPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY);
    admin.tokens.push({ token });
    await admin.save();

    const cookieOptions = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 };
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "You logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
