const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');


const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: "Votre compte a bien été créé !"
                }))
                .catch(error => res.status(400).json({ message : error }))
        })
        .catch(error => res.status(500).json({ message: error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: "Le compte choisi n'existe pas !"
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then( validation => {
                    if(!validation){
                        return res.status(405).json({
                            error: "Le mot de passe n'est pas correct !"
                        })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            { userId : user._id },
                            't0Ken_Generator-K3y_',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.statuts(500).json({ message: error }));
        })
        .catch(error => res.statuts(500).json({ message: error }));
};