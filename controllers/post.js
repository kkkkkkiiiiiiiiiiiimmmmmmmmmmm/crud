const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getAllPosts = async (req, res, next) => {
  const getPosts = await Post.findAll();
  const postList = await getPosts.map((post) => {
    return post.dataValues;
  });
  let isPostExisted = true;
  if (postList.length === 0) isPostExisted = false;
  else isPostExisted = true;

  res.render("posts", {
    pageTitle: "Posts",
    isPostExisted: isPostExisted,
    postList: postList,
  });
};
exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    let postData;
    await Post.findByPk(postId).then((res) => {
      postData = res.dataValues;
    });
    const getComments = await Comment.findAll({ where: { postId: postId } });
    const commentList = await getComments.map((comment) => {
      return comment.dataValues;
    });

    let isCommentExist = commentList.length == 0 ? false : true;

    const date = postData.createdAt.toString().substring(0, 24);

    res.render("post", {
      pageTitle: "Post",
      postTitle: postData.title,
      author: postData.author,
      postContent: postData.content,
      postCreatedAt: date,
      postId: postData.id,
      isCommentExist: isCommentExist,
      commentList: commentList,
    });
  } catch (Error) {
    console.log(Error);
    res.status(404).render("error404", {
      pageTitle: "404 Error",
      errorMessage: "404 Page Not Found",
    });
  }
};
exports.writePost = (req, res, next) => {
  res.render("writePost", { pageTitle: "Write Post" });
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  let postData;
  await Post.findByPk(postId).then((res) => {
    postData = res.dataValues;
  });
  res.render("updatePost", {
    pageTitle: "Update Post",
    postId: postData.id,
    authorName: postData.author,
    postTitle: postData.title,
    postContent: postData.content,
  });
};
exports.postProcess = async (req, res, next) => {
  const author = req.body.authorName;
  const title = req.body.postTitle;
  const content = req.body.postContent;
  await Post.create({
    title: title,
    content: content,
    author: author,
    userId: 1,
  });
  res.redirect("/posts");
};
exports.updatePostProcess = async (req, res, next) => {
  const author = req.body.authorName;
  const title = req.body.postTitle;
  const content = req.body.postContent;
  const id = req.params.postId;
  await Post.update(
    {
      author: author,
      content: content,
      title: title,
      userId: 1,
    },
    { where: { id: id } }
  );
  res.redirect(`/post/postId=${id}`);
};
exports.deletePostProcess = async (req, res, next) => {
  const deletedPostId = req.params.postId;
  Post.destroy({
    where: { id: deletedPostId },
  });
  res.redirect("/posts");
};
