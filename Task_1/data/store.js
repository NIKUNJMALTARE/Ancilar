const { v4: uuidv4 } = require('uuid');

const posts = new Map();
const comments = new Map();

module.exports = {
  posts,
  comments,
  uuidv4
};
