const Pa = require('../Models/ProduitsAchetes')
const Formation = require('../Models/Formation');
const User = require('../Models/User');

exports.postPA = (req, res) => {
 
    const clientId = req.params.id;

    const { formationId, dateAchat, priceF, nameF } = req.body;
     

    // Création d'une entrée dans la table de liaison
    Pa.create({
        nom: nameF,
        prix: priceF,
        date_achat: dateAchat,
        FormationId: formationId,
        UserId: clientId,
    })
    .then(() => {
        res.status(201).json({
            message: 'La référence du produit a bien été enregistrée 😃'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send('Une erreur est survenue');
    });
}

exports.getPA = (req, res) => {

    const userId = req.params.id;

    // Recherche l'utilisateur correspondant à l'ID spécifié
    User.findOne({
        where: { id: userId },
        include: [
            {
                model: Formation,
                through: {
                    model: Pa,
                    attributes: ['date_achat'],
                },
            },
        ],
    })
        .then((user) => {
            // Renvoie les données sous forme de JSON
            res.status(200).json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Une erreur est survenue');
        });
}

exports.putPa = (req, res) => { 

    const userId = req.params.id;
    const { barProgress, tempsProgress, idModule, notation, idFormation } = req.body;
console.log(barProgress, tempsProgress, idModule, notation, idFormation, 'APAPAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    // Recherche l'utilisateur correspondant à l'ID spécifié
    User.findOne({
        where: { id: userId },
        include: [
            {
                model: Pa,
                model: Formation,
                through: {
                    model: Pa,
                    where: { FormationId: idFormation },
                }
            },
        ],
    })
    .then((user) => {
        // Met à jour les champs de la formation dans la table de liaison pour l'utilisateur
        
       
        user.Formations[0].produits_achetes.barProgress = barProgress;
        user.Formations[0].produits_achetes.progressTime = tempsProgress;
        user.Formations[0].produits_achetes.idModuleProgress = idModule;
        user.Formations[0].produits_achetes.notation = notation;

        user.Formations[0].produits_achetes.save();
  
        // Renvoie les données mises à jour sous forme de JSON
        res.status(200).json(user);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Une erreur est survenue');
    });
}


exports.removeRelation = (req, res, next) => {

  const formationId = req.params.id;

  // Supprimer la relation entre tous les utilisateurs et la formation
  User.update(
    { FormationId: null },
    { where: { FormationId: formationId } }
  )
    .then(() => {
      // Supprimer la formation
      Formation.destroy({ where: { id: formationId } })
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Une erreur est survenue');
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Une erreur est survenue');
    });
    
};


