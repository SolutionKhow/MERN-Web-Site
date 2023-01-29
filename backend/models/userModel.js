const express = require('express')
const mongoose = require('mongoose');
//import validator from 'validator';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
        maxlength: [30, "Name Con not exceed"],
        minLength: [4, "Full Name Requuired"],
    },

    email: {
        type: String,

        unique: true,
        required: [true, 'Email address is required'],
        validate: [validator.isEmail, "Please Enter Valid Email"]


    },



    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [8, "Password Should be 8 length"],
        select: false,

    },
    avatar:
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }

    },
    Role: {
        type: String,
        default: 'user',
    },
    resetPasswordTokken: String,
    resetPasswordExpire: Date,



});

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});


//JWT Token

userSchema.methods.getJWTToken = function () {
    const payload = {
        id: this._id
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

}

//Compare Password

userSchema.methods.comparedPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

//Generate oassword Reset 

userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hasing and Adding resetpassword token

    this.resetPasswordTokken = crypto.createHash("sha256").update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
} 





module.exports = mongoose.model('User', userSchema);