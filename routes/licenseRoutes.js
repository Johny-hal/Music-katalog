const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/authMiddleware");
const licenseController = require("../controllers/licenseController");

router.post("/:songId", licenseController.createRequest);
router.get("/", requireLogin, licenseController.getAllRequests);
router.post("/:id/approve", requireLogin, licenseController.approveRequest);
router.post("/:id/reject", requireLogin, licenseController.rejectRequest);

module.exports = router;
