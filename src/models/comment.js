const { DataTypes } = require('sequelize');

module.exports = (sequelize, Post) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
      allowNull: false,
    },
  });

  Comment.belongsTo(Post, { foreignKey: 'postId' });
  Comment.hasMany(Comment, { as: 'children', foreignKey: 'parentId' });

  return Comment;
};