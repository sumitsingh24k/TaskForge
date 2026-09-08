const authService = require('../services/auth.service');

const registerUser = async (req, res, next) => {
    try{ 
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        }) ;

    }
    catch(error){
        next(error);
    }           
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(
            email,
            password
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        next(error);
    }
    
};
const getCurrentUser = async (req, res, next) => {
    try{
        const user = await authService.getCurrentUser(req.user.id);
        res.json({
            success: true,
            message: "Current user fetched successfully",
            user: user
        }); 
    }
    catch(error){
        next(error);
    }
}


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}