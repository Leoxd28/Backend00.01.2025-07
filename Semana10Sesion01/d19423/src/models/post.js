module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: { type: DataTypes.TEXT, allowNull: false },
    published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    authorId: { type: DataTypes.INTEGER, allowNull: false },
  },
    {
      tableName: 'posts',
      paranoid: true
    })

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' })
  }
  return Post;
};