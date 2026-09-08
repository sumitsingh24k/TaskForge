const jwt = require('jsonwebtoken');
const generateToken = (userID,role) => {
    return jwt.sign({ userID, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    } catch (error) {
        throw new Error('Invalid token');
    }   
}

module.exports = { generateToken, verifyToken };