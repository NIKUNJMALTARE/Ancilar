const express = require('express');
const router = express.Router();
const { posts, comments, uuidv4 } = require('../data/store');

router.post('/addpost', (req, res) => {
  const { title, content } = req.body;
  const id = uuidv4();
  const newPost = { id, title, content, createdAt: new Date() };
  posts.set(id, newPost);
  res.status(201).json(newPost);
});


router.get('/getallpost', (req, res) => {
  res.json(Array.from(posts.values()));
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const existing = posts.get(id);
  if (!existing) return res.status(404).json({ error: 'Post not found' });

  const { title, content } = req.body;
  if (title !== undefined) existing.title = title;
  if (content !== undefined) existing.content = content;
  posts.set(id, existing);
  res.json(existing);
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!posts.has(id)) return res.status(404).json({ error: 'Post not found' });

  posts.delete(id);

 
  for (const [commentId, comment] of comments.entries()) {
    if (comment.postId === id) comments.delete(commentId);
  }

  res.status(204).send();
});


router.post('/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  if (!posts.has(postId)) return res.status(404).json({ error: 'Post not found' });

  const { author, text } = req.body;
  const id = uuidv4();
  const comment = { id, postId, author, text, createdAt: new Date() };
  comments.set(id, comment);
  res.status(201).json(comment);
});

router.get('/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  if (!posts.has(postId)) return res.status(404).json({ error: 'Post not found' });

  const postComments = Array.from(comments.values()).filter(c => c.postId === postId);
  res.json(postComments);
});

module.exports = router;