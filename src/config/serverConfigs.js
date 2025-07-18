const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
    PORT:process.env.PORT,
    SALT:bcrypt.genSaltSync(Number(process.env.SALT_NUMBER)),
    JWT_KEY:process.env.JWT_KEY,
    JWT_EXPIRY:process.env.JWT_EXPIRY
}