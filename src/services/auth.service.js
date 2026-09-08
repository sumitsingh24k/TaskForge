const user = require('../models/User');


const registerUser = async (userData) => {
    const user = await User.create(userData);
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }); 
    const token = generateToken(user._id);

    return {
        user,
        token
    };
};

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId);   
    return user;
}

module.exports = { registerUser, loginUser, getCurrentUser };