const UserService = require("../services/user-service");
const {StatusCodes} = require("http-status-codes");
const successResponse = require("../utils/successResponse");

const userService = new UserService();

const create = async(req,res,next)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });

        return successResponse(res,StatusCodes.CREATED,response,"User created successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const signIn = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const response = await userService.signIn(email,password);
        return successResponse(res,StatusCodes.OK,response,"signIn successfully");
    } catch (error) {
        next(error);
    }
}

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return successResponse(res,StatusCodes.OK,response,"user is authenticated and token is valid");
    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const response = await userService.destroy(id);
        return successResponse(res,StatusCodes.OK,response,"User deleted successfully");
    } catch (error) {
        next(error);
    }
}

const getUserById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const response = await userService.getUserById(id);
        return successResponse(res,StatusCodes.OK,response,"User fetched successfully");
    } catch (error) {
        next(error);
    }
}

const isAdmin = async(req,res,next)=>{
    try {
        const {id} = req.body;
        const response = await userService.isAdmin(id);
        return res.status(200).json({
            success:response, // true/false 
            message: response ? "User is admin" : "Not admin",
            err:{},
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    getUserById,
    signIn,
    deleteUser,
    isAuthenticated,
    isAdmin
}