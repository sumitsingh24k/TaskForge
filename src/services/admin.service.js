const User = require('../models/User');

const getAllUsers = async () => {
    return await User.find().select('-password').sort({ createdAt: -1 });
};

module.exports = { getAllUsers };
