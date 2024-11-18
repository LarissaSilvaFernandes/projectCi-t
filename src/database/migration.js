const { Sequelize, DataTypes } = require('sequelize');
// Nao esqueca de informar a senha antes de rodar a aplicacao
const sequelize = new Sequelize('comments', 'postgres', 'SUA_SENHA', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

const Post = require('../models/post')(sequelize, DataTypes);
const Comment = require('../models/comment')(sequelize, Post);

const initDb = async () => {
  await sequelize.sync({ force: true });

  
  const [post1, post2] = await Post.bulkCreate([
    { text: 'post 1' },
    { text: 'post 2' },
  ]);

  await Comment.bulkCreate([
    { text: 'comment 1.1', postId: post1.id },
    { text: 'comment 1.2', postId: post1.id },
    { text: 'comment 1.1.1', postId: post1.id, parentId: 1 },
    { text: 'comment 1.1.2', postId: post1.id, parentId: 1 },
    { text: 'comment 2.1', postId: post2.id },
    { text: 'comment 2.2', postId: post2.id },
  ]);
};

module.exports = { sequelize, initDb };
