const express = require("express");
const router = express.Router();

const { create, hasCompany } = require("../controllers/company.controller");
const { authMiddle } = require("../middleware/auth.middleware");

router.post("/create", authMiddle, create);
router.get("/check-company", authMiddle, hasCompany);

module.exports = router;
