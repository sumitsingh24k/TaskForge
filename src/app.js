const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const adminRoutes = require('./routes/admin.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
