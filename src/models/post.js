const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Post;
};