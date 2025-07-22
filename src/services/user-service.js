const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {JWT_KEY,JWT_EXPIRY} = require("../config/serverConfigs");
const AppError = require("../utils/appError");
const {StatusCodes} = require("http-status-codes");

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            user.password = null;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signIn(email,password) {
        try {
            // get the user based on email
            const user = await this.userRepository.getUserByEmail(email);
            if(!user){
                throw new AppError(`User not registered with email: ${email}`,StatusCodes.BAD_REQUEST);
            }

            const isPasswordMatch = this.#verifyPassword(password,user.password);
            if(!isPasswordMatch) {
                throw new AppError(`Password is incorrect`,StatusCodes.BAD_REQUEST);
            }

            const jwtToken = this.#createToken({email:user.email,id:user.id});
            return jwtToken;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId){
        try {
            const user = await this.userRepository.getUserById(userId);
            if(!user){
                throw new AppError(`uesrId is Invalid`,StatusCodes.BAD_REQUEST);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await this.getUserById(userId); // if user exit won't throw any error
            return await this.userRepository.destroy(userId);
        } catch (error) {
            throw error;
        }
    }

    #createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn:`${JWT_EXPIRY}`});
            return token;
        } catch (error) {
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw new AppError("Invalid token",StatusCodes.UNAUTHORIZED);
            }
            const user = await this.userRepository.getUserById(response.id);
            if(!user){
                throw new AppError("User not exist with the corresponding token",StatusCodes.BAD_REQUEST)
            }

            return user.id;
        } catch (error) {
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            throw error;
        }
    }

    #verifyPassword(userInputPassword,encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            throw error;
        }
    }
    
    async isAdmin(userId) {
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService