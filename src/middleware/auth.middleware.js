const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Header se Authorization nikaalo
        const authHeader = req.headers.authorization;

        // 2. Authorization header hai ya nahi?
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header missing'
            });
        }

        // 3. "Bearer TOKEN" ko 2 parts mein divide karo
        const [scheme, token] = authHeader.split(' ');

        // 4. Bearer format check karo
        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authorization format'
            });
        }

        // 5. JWT verify karo
        const decoded = verifyToken(token);

        // 6. User abhi bhi DB mein exist karta hai? (deleted user ka purana token reject ho)
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        // 7. User ki information request mein attach karo
        req.user = { id: user._id.toString(), role: user.role };

        // 8. Agle middleware/controller ko request bhejo
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authMiddleware;
