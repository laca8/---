const express = require("express");
const {
  getReports,
  addReport,
  getReport,
  updateReport,
} = require("../controllers/report");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(verifyToken, getReports).post(addReport);
router.route("/:id").get(getReport).put(updateReport);
module.exports = router;
