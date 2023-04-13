const Pa = require('../Models/ProduitsAchetes')
const Formation = require('../Models/Formation');
const User = require('../Models/User');

exports.postPA = (req, res) => {

    console.log('LE SIGNAL ATTENDU...', req.body);
 
    const clientId = req.params.id;

    const { formationId, dateAchat, priceF, nameF } = req.body;


// Creation entrée table de liaison
console.log(formationId);

const FormationAchete = Pa.build({
    nom: nameF,
    prix: priceF,
    clientId: clientId,
    referenceId: formationId,  
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

    //recherche user 

    User.findOne({
        where: {
            id: userId
        },
        include: [{
            model: Formation,
            through: {
                model: Pa,
                attributes: ['date_achat']
            }
        }]
    })
    .then(user => {
        // renvoie données format Json
        res.json(user.formations);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Une erreur est survenue');
    })
    
}