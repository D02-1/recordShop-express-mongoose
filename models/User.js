const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require('crypto');

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        admin: {
            type: Boolean,
            default: false,
        },
        email:String,
        password: String
    }, { timestamps: true });

userSchema.methods.hashPassword = (password) => {
    const hash = crypto.createHmac('sha256', process.env.SECRET_TOKEN).update(password).digest('hex');

    return hash;
};

userSchema.methods.comparePassword = function (loginPassword) {
    if (this.password !== this.hashPassword(loginPassword)) {
        return false;
    }
    return true;
};

// to generate a production based secret for the .env file:
// console.log(crypto.randomBytes(64).toString('hex'));

module.exports = mongoose.model("User", userSchema, "users");