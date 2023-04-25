const Pa = require('../Models/ProduitsAchetes')
const Formation = require('../Models/Formation');
const User = require('../Models/User');

exports.postPA = (req, res) => {
 
    const clientId = req.params.id;

    const { formationId, dateAchat, priceF, nameF } = req.body;
     

// Creation entrée table de liaison
console.log(formationId);

const FormationAchete = Pa.build({
    
    nom: nameF,
    prix: priceF,  
    date_achat: dateAchat,
    FormationId: formationId,
    UserId: clientId,
}) 
FormationAchete.save()
.then(res.status(201).json({
    message: ' La référence du produit a bien été enregistrée 😃'
})
)
.catch(error => console.log(error));
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

 // console.log('gaga : : : : : : ',req.body);

  const userId = req.params.id;
  const { barProgress, tempsProgress, idModule, notation, idFormation } = req.body;


  // Recherche l'utilisateur correspondant à l'ID spécifié
  User.findOne({
    where: { id: userId },
    include: [
      {
        model: Formation,
        through: {
          model: Pa,
          attributes: ['FormationId'],
        },
      },
    ],
  })
    .then((user) => {
      console.log('tttototoot:',user.Formations[0]);
      // Met à jour la date d'achat du produit pour l'utilisateur
      user.Formations[0].progressTime = tempsProgress;
      user.Formations[0].idModuleProgress =  idModule;
      user.Formations[0].barProgress = barProgress;
      user.Formations[0].notation = notation;
      user.Formations[0].save();

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




