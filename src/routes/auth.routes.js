const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getCurrentUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// /me har authenticated user ke liye hai -- sirf admin ke liye nahi
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
