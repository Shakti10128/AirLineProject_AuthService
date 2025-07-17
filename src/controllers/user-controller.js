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
            message:"User created successfull",
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

module.exports = {
    create
}