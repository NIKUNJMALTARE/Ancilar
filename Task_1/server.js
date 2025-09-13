const express = require('express');
const app = express();
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

app.use(express.json());
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});