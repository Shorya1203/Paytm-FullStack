const mongoose = require('mongoose') ; 
const { float64 } = require('zod');
require('dotenv').config() ; 
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)

// Defining the User Schema First
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50 
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}) ; 

// Creating the model based on the above schema
const User = mongoose.model('User', userSchema) ;
const Account = mongoose.model('Account', accountSchema) ;  
module.exports = {
    User, Account
};