const { where } = require("sequelize");
const {User,Role} = require("../models/index");

class UserRepository{
    async create(data){
        return await User.create(data);
    }


    async destroy(userId){
        await User.destroy({
            where:{
                id:userId
            }
        });
        return true;
    }

    async getUserById(userId){
        const user = await User.findByPk(userId,{
            attributes:['email','id']
        });
        return user;
    }
    async getUserByEmail(email){
        const user = await User.findOne({
            where:{
                email:email
            }
        });
        return user;
    }
    async isAdmin(userId){
        const user = await User.findByPk(userId);
        const adminRole = await Role.findOne({
            where:{
                name:'ADMIN'
            }
        });
        const response = await user.hasRole(adminRole);
        return response;
    }
}

module.exports = UserRepository;