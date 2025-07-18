const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const {JWT_KEY,JWT_EXPIRY} = require("../config/serverConfigs");

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    async getUserById(userId){
        try {
            const user = await this.userRepository.getUserById(userId);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn:`${JWT_EXPIRY}`});
            return token;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw {error};
        }
    }

    createToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation");
            throw {error};
        }
    }
}

module.exports = UserService