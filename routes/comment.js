const express = require("express");

const router = express.Router();

const commentController = require("../controllers/comment");

router.use(
  "/comment-process/postId=:postId",
  commentController.postCommentProcess
);

router.use(
  "/delete-comment-process/postId=:postId&commentId=:commentId",
  commentController.deleteCommentProcess
);

module.exports = router;
