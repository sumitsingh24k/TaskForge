const adminService = require('../services/admin.service');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await adminService.getAllUsers();
        res.json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            users: users
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers };
