const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

exports.register = async (req, res, next) => {
    
    const { 
        name,
        secondName,
        email,
        telephone,
        autorisationDocument,
        documentType,
    } = req.body;
    console.log(req.body);
    
    try {
        
        let user = await User.findOne({
            where: {
                email: req.body.email,
            }
            
        })
        if (user != null) {
            if( user.email === req.body.email) {
                res.status(401).json({message: "Cet e-mail éxiste déjà, veuillez en inscrire un nouveau"})
            }
            else if (user.telephone === req.body.telephone ) {
                res.status(401).json({message: "Ce numéro est déjà enregistré, veuillez en saisir un autre, merci"})
            }
        } else {
            const salt = await bcrypt.genSalt(3);
            const password = await bcrypt.hash( req.body.password, salt);
            const user = new User({
                name,
                secondName,
                email,
                telephone,
                password,
                autorisationDocument,
                documentType
            });
            user.save()
            .then(res.status(201).json({
                message: 'Votre inscription a été enregistré ! Félicitations et bienvenue 😃'
            }))
            .catch(error => console.log(error));
        }
        
        
    } catch (err) {
        
        res.status(400).send({
            err
        })
        
    }
}

// controller login 


exports.login = (req, res, next) => {
    
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {

        if(!user){
         return res.status(401).json({ message: 'Utilisateur non trouvé 😣, veuillez réessayer'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(403).json({message: 'Mot de passe incorrect 😥!, réessayez !'})
                } else {
                    res.status(200).json({ 
                         token: jwt.sign(
                            { userId: user.id }, 
                            'HARD_SECRET_TOKEN',
                             {expiresIn: '24h' }), 
                              userId: user.id
                            })
                }
            })
            .catch(err => res.status(500).json( { err } ))
        }
    }).catch(err => res.status(500).json({ err }))
}


exports.deleteUser = (req, res, next) => {

    User.findOne( {
        where : {
            id: req.body.id
        }
    })
    .then( user => 
        user.destroy()
        .then(() => res.status(200).json({ message : "Utilisateur supprimé !"}))
        .catch( err => res.status(400).json({ message : "Mauvaise requête !"}))
        )
        
}


exports.putUser = (req, res, next) => {

    User.update({
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        secondName : req.body.secondName,
        telephone : req.body.telephone,
        documentType : req.body.documentType,
        autorisationDocument : req.body.autorisationDocument}, {
            where : {
                id : req.user.id
            }
        })
    .then(user => 
        res.status(200).json({ message : 'Bravo ! Vos données ont été modifiées !'})
        )
        .catch( err => res.status(400).json({ message : "Mauvaise requête !"}))
}