const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const requestOfferCtrl = require("../controllers/requestOffer.controller");

router.post(
  "/create",
  authMiddle,
  isDeleted,
  requestOfferCtrl.createBuyerRequest
);
router.post(
  "/acceptOffer",
  authMiddle,
  isDeleted,
  requestOfferCtrl.acceptOrRejectCustomOffer
);
router.get(
  "/get-all-buyerRequest",
  authMiddle,
  isDeleted,
  requestOfferCtrl.getAllBuyerRequests
);
router.post(
  "/acceptOffer",
  authMiddle,
  isDeleted,
  requestOfferCtrl.acceptOrRejectCustomOffer
);
router.get(
  "/get-all-sendoffers",
  authMiddle,
  isDeleted,
  requestOfferCtrl.getSentOffers
);
router.get(
  "/get-user-request",
  authMiddle,
  isDeleted,
  requestOfferCtrl.getUserBuyerRequests
);
router.get("/:id", authMiddle, isDeleted, requestOfferCtrl.getBuyerRequestById);
router.put(
  "/:id",
  authMiddle,
  isDeleted,
  requestOfferCtrl.updateBuyerRequestById
);
router.delete(
  "/:id",
  authMiddle,
  isDeleted,
  requestOfferCtrl.deleteBuyerRequestById
);

module.exports = router;
