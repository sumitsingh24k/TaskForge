const authService = require('../services/auth.service');

const registerUser = async (req, res, next) => {
    try{ 
        const user = await authService.registerUser(req.body);
        res.status(201).json(user)({
            message: "User registered successfully",
            user: user
        }) ;

    }
    catch(error){
        next(error);
    }           
}

const loginUser = async (req, res, next) => {
    try{
        const user= await authservice.loginUser(req.body);
        res.json({
            message: "User logged in successfully",
            user: user
        });
    }
    catch(error){
        next(error);
    }
}

const getCurrentUser = async (req, res, next) => {
    try{
        const user = await authService.getCurrentUser(req.user.id);
        res.json({
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