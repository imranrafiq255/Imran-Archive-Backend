const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
  },
  adminPassword: {
    type: String,
    min: [6, "Password should be greater or equal to 6 characters"],
  },
  tokens: [
    {
      token: String,
    },
  ],
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) {
    return next();
  }
  try {
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
