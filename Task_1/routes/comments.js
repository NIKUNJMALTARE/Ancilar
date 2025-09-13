const express = require('express');
const router = express.Router();
const { comments } = require('../data/store');

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!comments.has(id)) return res.status(404).json({ error: 'Comment not found' });

  comments.delete(id);
  res.status(204).send();
});

module.exports = router;