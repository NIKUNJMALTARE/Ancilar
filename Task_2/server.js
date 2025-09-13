const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use(express.json());

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/', enrollmentRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});