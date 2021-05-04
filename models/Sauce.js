const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    userId: { type : String, required : true},
    name: { 
        type : String, 
        required : true,
        maxlength : [40, "Le nom de la sauce est bien trop long."]
    },
    manufacturer: { 
        type : String, 
        required : true,
        maxlength : [55, "Le nom du fabricant est bien trop long."]
    },
    description: { 
        type : String, 
        required : true,
        maxlength : [1000, "La description ne doit pas dépasser 1 000 caractères."]
    },
    mainPepper: { 
        type : String, 
        required : true,
        maxlength : [300, "La liste des ingrédients ne doit pas dépasser 200 caractères."]
    },
    imageUrl: { type : String, required : true},
    heat: { type : Number, required : true},
    likes: { type : Number, required : true},
    dislikes: { type : Number, required : true},
    usersLiked: { type : Array, required : true},
    usersDisliked: { type : Array, required : true}
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);