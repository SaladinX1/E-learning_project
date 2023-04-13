const Pa = require('../Models/ProduitsAchetes')
const Formation = require('../Models/Formation');
const User = require('../Models/User');

exports.postPA = (req, res) => {
    
    const userId = req.params.id;

    const {formationId, dateAchat, price, name } = req.body;


// Creation entrée table de liaison

const FormationAchete = new Pa({

    nom: name,
    prix: price,
    userId: userId,
    referenceId: formationId,  
    date_achat: dateAchat,

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