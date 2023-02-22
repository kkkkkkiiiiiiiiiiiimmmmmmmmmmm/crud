const User = require("../models/users");
const Comment = require("../models/comment");

// later, I will make this with socket.io
exports.postCommentProcess = (req, res, next) => {
  const postId = req.params.postId;
  const comment = req.body.comment;
  const userId = req.session.userId;
  Comment.create({
    content: comment,
    author: "Kim",
    userId: userId,
    postId: postId,
  });
  res.redirect(`/post/postId=${postId}`);
};
exports.deleteCommentProcess = async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.session.userId;

  await User.findOne({ commentId: commentId })
    .then((user) => {
      if (userId === user.id) {
        Comment.destroy({
          where: { id: commentId },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect(`/post/postId=${postId}`);
};
