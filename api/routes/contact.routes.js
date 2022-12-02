const express = require("express");
const router = express.Router();

const contactCtrl = require("../controllers/contact.controller");

router.post("/ask-question", contactCtrl.askQuestion);
router.post("/reply-question", contactCtrl.replyQuestion);
router.get("/get-all-queries", contactCtrl.getAllQueries);

module.exports = router;
