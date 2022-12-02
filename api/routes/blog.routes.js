const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const blogCtrl = require("../controllers/blog.controller");
const {} = require("../middleware/uploadImage.middleware");

router.get("/mine", authMiddle, isDeleted, blogCtrl.getMyBlogs);
router.get("/all", authMiddle, isDeleted, blogCtrl.getAllBlogs);
router.get("/:id", authMiddle, isDeleted, blogCtrl.getBlogById);
router.post("/post", authMiddle, isDeleted, blogCtrl.postBlog);
router.put("/:id", authMiddle, isDeleted, blogCtrl.updateBlogById);
router.delete("/:id", authMiddle, isDeleted, blogCtrl.deleteBlogById);
router.post("/review", authMiddle, isDeleted, blogCtrl.postReview);
router.post("/like/:blogId", authMiddle, isDeleted, blogCtrl.likeBlog);

module.exports = router;
