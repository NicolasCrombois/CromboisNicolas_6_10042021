const editPathFile = require("../utils/editPathFile.js"); 
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const xss = require('xss');

const Sauce = require('../models/Sauce');

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json( sauces.map((sauce) => editPathFile.customUrlImage( sauce, req ))))
        .catch(error => res.status(400).json({ error}));
};

exports.sauceId = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json( editPathFile.customUrlImage( sauce, req ) ))
        .catch(error => res.status(400).json({ error}));
};

exports.postSauce  = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        name: xss(sauceObject.name),
        manufacturer: xss(sauceObject.manufacturer),
        description: xss(sauceObject.description),
        heat: xss(sauceObject.heat),
        likes: 0,
        dislikes: 0,
        mainPepper: xss(sauceObject.mainPepper),
        usersLiked: [],
        usersDisliked: [],
        userId: xss(sauceObject.userId),
        imageUrl: `${req.file.filename}`
    })
    Sauce.updateMany(
        Sauce.find(),
        {"$set":{"likes": 0, "dislikes" : 0, "usersDisliked": [], "usersLiked": []}},
        {},
        (err, writeResult) => {}
    );
    sauce.save()
        .then(() => res.status(201).json({ message : "La sauce a bien été ajouté" }))
        .catch(error => res.status(400).json({ message: error}));
};

exports.editSauce = (req, res, next) => {
    if(!req.file){
        Sauce.updateOne({ _id: req.params.id}, {
            name : xss(req.body.name),
            manufacturer : xss(req.body.manufacturer),
            description: xss(req.body.description),
            mainPepper : xss(req.body.mainPepper),
            heat : xss(req.body.heat),
            _id: req.params.id})

            .then(() => res.status(200).json({ message: 'La sauce a bien été modifié !'}))
            .catch(error => res.status(400).json({ message: error }));
    }else{
        const sauceObject = JSON.parse(req.body.sauce);
        var queries = {
            "name": xss(sauceObject.name),
            "manufacturer": xss(sauceObject.manufacturer),
            "description": xss(sauceObject.description),
            "heat": xss(sauceObject.heat),
            "mainPepper": xss(sauceObject.mainPepper),
            "imageUrl": `${req.file.filename}`,
            _id: req.params.id
        };



        Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                fs.unlinkSync(`./images/${sauce.imageUrl}`)
            })



        Sauce.updateOne({_id: req.params.id}, { $set: queries})
            .then(() => res.status(200).json({ message: 'La sauce a bien été modifié !'}))
            .catch(error => res.status(400).json({ message: error }));
    }
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then((sauce) => {
            
            res.status(200).json({ message: 'La sauce a été supprimé !'})
        })
        .catch(error => res.status(400).json({ message: error }));
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            fs.unlinkSync(`./images/${sauce.imageUrl}`)
        })
}

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            let nbLike = sauce.likes
            let nbDislike = sauce.dislikes
            let newUsersLiked = sauce.usersLiked;
            let newUsersDisliked = sauce.usersDisliked;
            if(req.body.like == 1){
                if (!sauce.usersLiked.find(element => element === req.body.userId)){

                    newUsersLiked.push(req.body.userId)
                    nbLike++
                    
                    if (sauce.usersDisliked.find(element => element === req.body.userId)){
                        newUsersDisliked.remove(req.body.userId)
                        nbDislike--
                    }
                }
            }
            if(req.body.like == -1){
                if (!sauce.usersDisliked.find(element => element === req.body.userId)){

                    newUsersDisliked.push(req.body.userId)
                    nbDislike++

                    if (sauce.usersLiked.find(element => element === req.body.userId)){
                        newUsersLiked.remove(req.body.userId)
                        nbLike--
                    }
                }
            }
            if(req.body.like == 0){
                if (sauce.usersDisliked.find(element => element === req.body.userId)){
                    newUsersDisliked.remove(req.body.userId)
                    nbDislike--
                }
                if (sauce.usersLiked.find(element => element === req.body.userId)){
                    newUsersLiked.remove(req.body.userId)
                    nbLike--
                }
            }
            Sauce.updateOne({_id: req.params.id}, { $set: {"usersLiked" : newUsersLiked, "likes" : nbLike, "usersDisliked" : newUsersDisliked, "dislikes" : nbDislike}})
            .then(() => res.status(200).json({ message: 'Votre avis a bien été enregistré !'}))
            .catch(error => res.status(400).json({ message: error }));
        })
        .catch(error => res.status(400).json({ message: error }))
    
}