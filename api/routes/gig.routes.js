const express = require("express");
const router = express.Router();

const {
  createGig,
  getAllGigs,
  updateGigById,
  deleteGig,
  getGigById,
  getAllGigsForCategory,
  postReview,
  getGigsByEtags,
  getMyGigs,
} = require("../controllers/gig.controller");
const upload = require("../middleware/attachmentMiddleware");
const { authMiddle } = require("../middleware/auth.middleware");

router.post("/create", authMiddle, upload, createGig);
router.get("/get-all", authMiddle, getAllGigs);
router.get("/get-my-gigs", authMiddle, getMyGigs);
router.get("/get-all-category", authMiddle, getAllGigsForCategory);
router.post("/searchByEtag", authMiddle, getGigsByEtags);
router.get("/:gigId", authMiddle, getGigById);
router.put("/:gigId", authMiddle, updateGigById);
router.post("/review", authMiddle, postReview);
router.delete("/:id", authMiddle, deleteGig);
module.exports = router;
