const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// pehle "tu kaun hai?", phir "tujhe permission hai?"
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

module.exports = router;
