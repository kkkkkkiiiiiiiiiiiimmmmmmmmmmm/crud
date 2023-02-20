const express = require("express");

const router = express.Router();

const postController = require("../controllers/post");

router.get("/posts", postController.getAllPosts);

router.get("/write-post", postController.writePost);

router.get("/write-post/postId=:postId", postController.updatePost);

router.get("/post/postId=:postId", postController.getPost);

router.post("/update-process/postId=:postId", postController.updatePostProcess);

router.post("/post-process", postController.postProcess);

router.get(
  "/delete-post-process/postId=:postId",
  postController.deletePostProcess
);

module.exports = router;
