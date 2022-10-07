const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

exports.register = async (req, res, next) => {
    const { 
        email,
        password
    } = req.body

    try {

        let user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
            
        })
        if (user != null) {
            if( user.email === req.body.email) {
                res.status(401).json({message: "Cet e-mail éxiste déjà, veuillez en inscrire un nouveau"})
            }
        } else {
            const salt = await bcrypt.genSalt(2);
            const password = await bcrypt.hash( req.body.password, salt);
            const user = new User({
                email,
                password
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


