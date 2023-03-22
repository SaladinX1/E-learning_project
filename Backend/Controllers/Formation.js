const Formation = require('../Models/Formation');
const fs = require('fs'); 
const { json, where } = require('sequelize');


exports.createFormation = (req, res) => {

const { nameFormation, priceFormation, namesModules, docsFormationCodes  } = req.body;

        try {
            const formationNew = new Formation ({
                UserId: req.user.id,
                nameFormation,
                priceFormation,
                namesModules,
                docsFormationCodes
            });
            formationNew.save()
            .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))


        } catch (err) {

        res.status(400).send({
        err
        })   
        }

} 