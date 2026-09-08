// roleMiddleware('admin')  ya  roleMiddleware(['admin', 'manager'])
const roleMiddleware = (...allowedRoles) => {
    const roles = allowedRoles.flat();

    return (req, res, next) => {
        // authMiddleware pehle chalna chahiye
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        next();
    };
};

module.exports = roleMiddleware;
