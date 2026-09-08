const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

// helper: status code ke saath error banao taaki errorHandler sahi code bheje
const httpError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const registerUser = async (userData) => {
    // sirf ye 3 fields lete hain -> body se role: "admin" bheja jaaye to ignore ho jaata hai
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw httpError('Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw httpError('Invalid email or password', 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw httpError('Invalid email or password', 401);
    }

    const token = generateToken(user._id, user.role);

    return { user, token };
};

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw httpError('User not found', 404);
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};
