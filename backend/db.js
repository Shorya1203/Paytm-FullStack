const mongoose = require('mongoose') ; 

mongoose.connect('mongodb+srv://Shorya1203:ShoryaSharma@shoryacluster.eiyaa3j.mongodb.net/Paytm')

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

// Creating the model based on the above schema
const User = mongoose.model('User', userSchema) ; 
module.exports = {
    User 
}