const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { 
        type : String, 
        match: [/[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/, 'Votre adresse e-mail n\'est pas correcte !'],
        required : true, 
        unique: true,
    },
    password: { type : String, required : true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);