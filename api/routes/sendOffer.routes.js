const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const sendOfferCtrl = require("../controllers/sendOffer.controller");
const {
  uploadResumeMiddleware,
} = require("../middleware/uploadImage.middleware");
router.get(
  "/customOffers",
  authMiddle,
  isDeleted,
  sendOfferCtrl.getMyCustomOffers
);
router.get("/Offers", authMiddle, isDeleted, sendOfferCtrl.getMyOffers);

router.post("/sendOffer", authMiddle, isDeleted, sendOfferCtrl.postOffer);
router.post(
  "/customOffer",
  authMiddle,
  isDeleted,
  sendOfferCtrl.postCustomOffer
);
module.exports = router;
