const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

    async signIn(email,password) {
        try {
            // get the user based on email
            const user = await this.userRepository.getUserByEmail(email);
            if(!user){
                throw {Error: "User not registered with the email:",email};
            }

            const isPasswordMatch = this.#verifyPassword(password,user.password);
            if(!isPasswordMatch) {
                throw {Error: "Incorrect password"};
            }

            const jwtToken = this.#createToken({email:user.email,id:user.id});
            return jwtToken;
        } catch (error) {
            console.log("something went wrong in signing process");
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

    #createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn:`${JWT_EXPIRY}`});
            return token;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation");
            throw {error};
        }
    }

    #verifyPassword(userInputPassword,encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password verification");
            throw {error};
        }
    }
}

module.exports = UserService