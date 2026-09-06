const express = require('express');
const app = express();
app.use(express.json());

const taskRoutes = require('./routes/task.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');


app.use('/api/tasks', taskRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
