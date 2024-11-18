const express = require('express');
const { sequelize } = require('./database/migration');
const Post = require('./models/post')(sequelize);
const Comment = require('./models/comment')(sequelize, Post);

const createServer = (port = 3000) => {
  const app = express();

  app.get('/posts/:postId/comments', async (req, res) => {
    const postId = parseInt(req.params.postId, 10);

    try {
      const comments = await Comment.findAll({
        where: { postId },
        include: [{ model: Comment, as: 'children' }],
        order: [['parentId', 'ASC'], ['id', 'ASC']],
      });

      if (comments.length === 0) {
        return res.status(404).json({ message: 'Post not found or no comments' });
      }

      const buildTree = (comments, parentId = null) =>
        comments
          .filter(comment => comment.parentId === parentId)
          .map(comment => {
            const children = buildTree(comments, comment.id);
            const commentData = {
              id: comment.id,
              text: comment.text,
            };
            
            if (children.length > 0) {
              commentData.children = children;
            }

            return commentData;
          });

      const commentsTree = buildTree(comments);
      res.status(200).json({ data: commentsTree });
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const serverInstance = app.listen(port, () => console.log(`[server] listening on port ${port}`));

  return {
    app,
    close: () =>
      new Promise((resolve) => {
        serverInstance.close(() => {
          resolve();
          console.log('[server] closed');
        });
      }),
  };
};

module.exports = createServer;
