const User = require("../models/users");
const Comment = require("../models/comment");

// later, I will make this with socket.io
exports.postCommentProcess = (req, res, next) => {
  const postId = req.params.postId;
  const comment = req.body.comment;

  Comment.create({
    content: comment,
    author: "Kim",
    userId: 1,
    postId: postId,
  });
  res.redirect(`/post/postId=${postId}`);
};
exports.deleteCommentProcess = (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  Comment.destroy({
    where: { id: commentId },
  });
  res.redirect(`/post/postId=${postId}`);
};
