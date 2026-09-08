const express= require('express');
const router=express.Router();

const { registerUser, loginUser ,getCurrentUser  } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me', authMiddleware, getCurrentUser);

module.exports=router;