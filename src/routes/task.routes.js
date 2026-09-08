const express = require('express');
const router = express.Router();

const { createTask, getTasks, getTaskById, UpdateTask, DeleteTask } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

// saare task routes protected hain
router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', UpdateTask);
router.delete('/:id', DeleteTask);

module.exports = router;
