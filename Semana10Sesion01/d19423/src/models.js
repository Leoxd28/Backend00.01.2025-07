// src/models.js (ejemplo de centralización)
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','author','reader'), defaultValue: 'reader' }
}, { tableName: 'users' });

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  slug:  { type: DataTypes.STRING, allowNull: false, unique: true },
  body:  { type: DataTypes.TEXT, allowNull: false },
  published: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'posts', paranoid: true });

const Comment = sequelize.define('Comment', {
  body: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'comments' });

// Asociaciones
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = { sequelize, User, Post, Comment };
