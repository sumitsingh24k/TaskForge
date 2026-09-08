const { verifyToken } = require('../utils/jwt');
    
const authMiddleware = (req, res, next) => {
    try {
        // 1. Header se Authorization nikaalo
        const authHeader = req.headers.authorization;

        // 2. Token hai ya nahi?
        if (!authHeader){
            return res.status(401).json({ success: false, message: 'Authorization header missing' });
        }

        // 3. "Bearer TOKEN" me se sirf TOKEN nikalo
        const token = authHeader.split(' ')[1];
        // 4. JWT verify karo
        const decoded = verifyToken(token);
         // 5. User ki information request me attach karo
        req.user = decoded;

        // 6. Agle middleware/controller ko request bhejo
            next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


module.exports = authMiddleware