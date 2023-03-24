const Formation = require('../Models/Formation');
const fs = require('fs'); 
const { json, where } = require('sequelize');


exports.createFormation = (req, res) => {

    console.log('Body: ',req.body);

const { nameFormation, priceFormation, durationFormation, namesModules, docsFormationCodes  } = req.body;

        try {
            const formationNew = new Formation ({
                UserId: req.user.id,
                nameFormation,
                priceFormation,
                durationFormation,
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

exports.getallFormations = (req, res) => {

    Formation.findAll()
    .then(formations => res.status(200).json(formations))
    .catch(error => res.status(500).json({message:' Erreur Serveur :('}))

}



exports.getOneFormation = (req, res) => {

    console.log('idFormation:', req.params.id);

    Formation.findOne(  {
        where: {
          id: req.params.id
        }
    })
    .then(formation => res.status(200).json(formation))   
    .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))


}