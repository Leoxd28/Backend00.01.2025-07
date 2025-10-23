module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT, allowNull: true
  });

  Comment.beforeCreate(comment => {
    if (comment.body) comment.body = comment.body.trim();
    if (!comment.body || comment.body.length < 5) {
      throw new Error('Comment must be at least 5 characters long');
    }
  });

  return Comment;
};
