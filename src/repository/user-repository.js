const { where } = require("sequelize");
const {User,Role} = require("../models/index");

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error}
        }
    }


    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error}
        }
    }

    async getUserById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error}
        }
    }
    async getUserByEmail(email){
        try {
            const user = await User.findOne({
                where:{
                    email:email
                }
            });
            return user ? user : null;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error}
        }
    }
    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            const response = await user.hasRole(adminRole);
            return response;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error}
        }
    }
}

module.exports = UserRepository;