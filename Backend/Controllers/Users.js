const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

exports.register = async (req, res, next) => {
    let { admin } = req.body;
    const { 
        name,
        secondName,
        company,
        email,
        telephone,
        autorisationDocument,
        documentType,
    } = req.body;
    console.log(req.body);

    if (name == process.env.ADMIN) {
        admin = 1;
    } else {
        admin = 0;
    }
    
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
                company,
                email,
                telephone,
                password,
                autorisationDocument,
                admin,
                documentType
            });
            user.save()
            .then(res.status(201).json({
                message: 'Votre inscription a été enregistré ! Félicitations et bienvenue 😃'
            })
            )
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
                    return res.status(403).json({message: 'Une erreur a été repérée dans votre saisie, information(s) incorrect(es) 😥!, réessayez !'})
                } else {
                    res.status(200).json({ 
                         token: jwt.sign(
                            { id: user.id }, 
                            process.env.TOKEN,
                             {expiresIn: '24h' }), 
                              id: user.id, name: user.secondName, admin: user.admin
                            })
                }
            })
            .catch(err => res.status(400).json( { err } ))
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err })})
}


exports.getUser =  (req,res, next) => {
    User.findByPk(req.auth)
    .then( user => 
        res.status(200).json(user)
    )
    .catch( err => { res.status(400).json({ message: "Vos données n'ont pas pu être récupérés , mauvaise requête !"})})
}

exports.putUser = async (req, res, next) => {
    let { admin, name } = req.body;
    const salt = await bcrypt.genSalt(3);
    const updatedPassword = await bcrypt.hash(req.body.password, salt);
  
    if (name == process.env.ADMIN) {
      admin = 1;
    } else {
      admin = 0;
    }
  
    User.update(
      {
        password: updatedPassword || User.password,
        name: name || User.name,
        secondName: req.body.secondName || User.secondName,
        company: req.body.company || User.company,
        telephone: req.body.telephone || User.telephone,
        documentType: req.body.documentType || User.documentType,
        autorisationDocument: req.body.autorisationDocument || User.autorisationDocument,
        admin: admin
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        User.findByPk(req.params.id)
          .then(user => {
            res.status(200).json({
              message: 'Bravo ! Vos données ont été modifiées !',
              token: jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: '24h' }),
              id: user.id
            });
          })
          .catch(err => res.status(404).json({ message: 'Utilisateur non trouvé !' }));
      })
      .catch(err => res.status(400).json({ message: 'Mauvaise requête !' }));
  };
    
    


