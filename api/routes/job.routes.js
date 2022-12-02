const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const jobCtrl = require("../controllers/job.controller");
const {
  uploadResumeMiddleware,
} = require("../middleware/uploadImage.middleware");

router.get("/all-posted-jobs", authMiddle, isDeleted, jobCtrl.getMyPostedJobs);
router.post("/allJobs", authMiddle, isDeleted, jobCtrl.getAllJobs);
router.get(
  "/view-applied-jobs",
  authMiddle,
  isDeleted,
  jobCtrl.viewAppliedJobs
);
router.get("/:id", authMiddle, isDeleted, jobCtrl.getJobById);
router.post("/post", authMiddle, isDeleted, jobCtrl.postJob);
router.post("/search", authMiddle, isDeleted, jobCtrl.searchJobs);
router.put("/:id", authMiddle, isDeleted, jobCtrl.updateJobById);
router.delete("/:id", authMiddle, isDeleted, jobCtrl.deleteJobById);
router.post(
  "/apply",
  authMiddle,
  isDeleted,
  uploadResumeMiddleware,
  jobCtrl.applyToJob
);
router.get("view-applied-jobs", authMiddle, isDeleted, jobCtrl.viewAppliedJobs);

module.exports = router;
