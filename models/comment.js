const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: { type: Sequelize.STRING, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  postId: { type: Sequelize.INTEGER, allowNull: false },
});
module.exports = Comment;
