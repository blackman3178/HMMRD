const User = require("./User");
const Review = require("./Review");
const Comment = require("./Comment");

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
  });
  Review.hasMany(Comment, {
      foreignKey: "reviewId",
      onDelete: "CASCADE"
  });
  Comment.belongsTo(User, {
      foreignKey: 'user_id',
      onDelete: "CASCADE"
  });

module.exports = { User, Review, Comment };