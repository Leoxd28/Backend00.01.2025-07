import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Comment extends Model {}
  Comment.init({
    body: { type: DataTypes.TEXT, allowNull: false }
  }, { sequelize, modelName: 'Comment' });

  Comment.beforeValidate((c) => {
    if (typeof c.body === 'string') c.body = c.body.trim();
    if (!c.body || c.body.length < 3) throw new Error('Comment body too short');
  });

  return Comment;
};
