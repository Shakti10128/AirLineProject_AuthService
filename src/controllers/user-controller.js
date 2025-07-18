const UserService = require("../services/user-service");

const userService = new UserService();

const create = async(req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });

        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Bad Request",
            err:error,
            data:{}
        })
    }
};

const signIn = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const response = await userService.signIn(email,password);
        return res.status(200).json({
            success:true,
            message:"signIn successfully",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Bad Request",
            err:error,
            data:{}
        })
    }
}

const getUserById = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await userService.getUserById(id);
        return res.status(200).json({
            success:true,
            message:"User fetched successfully",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Bad Request",
            err:error,
            data:{}
        })
    }
}

module.exports = {
    create,
    getUserById,
    signIn
}