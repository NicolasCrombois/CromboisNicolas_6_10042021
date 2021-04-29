const schemaPassword = require('../models/Password');

// We check that the word entered by the user is strong
module.exports = (req, res, next) => {
    if (!schemaPassword.validate(req.body.password)) {
        res.writeHead(400, "Votre mot de passe doit possèder : 8 caractères minimun, avec au moins 1 majuscule, 1 minuscule et ne doit pas possèder d\'espace", {
            'content-type': 'application/json'
        });
        res.end();
    } else {
        next();
    }
};