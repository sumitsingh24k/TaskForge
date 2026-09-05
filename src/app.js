const express = require('express');
const app = express();
app.use(express.json());

const taskRoutes = require('./routes/task.routes');
app.use('/api/tasks', taskRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

module.exports = app;
