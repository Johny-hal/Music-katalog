const mongoose = require("mongoose");

const licenseRequestSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  },
  applicantName: String,
  email: String,
  message: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("LicenseRequest", licenseRequestSchema);
