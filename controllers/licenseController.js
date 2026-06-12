const LicenseRequest = require("../models/LicenseRequest");

exports.createRequest = async (req, res) => {
  const { applicantName, email, message } = req.body;
  await LicenseRequest.create({
    song: req.params.songId,
    applicantName,
    email,
    message
  });
  res.redirect("/songs");
};

exports.getAllRequests = async (req, res) => {
  const requests = await LicenseRequest.find()
    .populate("song")
    .sort({ createdAt: -1 });
  res.render("requests/index", { requests });
};

exports.approveRequest = async (req, res) => {
  await LicenseRequest.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.redirect("/requests");
};

exports.rejectRequest = async (req, res) => {
  await LicenseRequest.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.redirect("/requests");
};
