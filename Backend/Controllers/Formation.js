const Formation = require('../Models/Formation');



exports.create =  (req, res) => {

    const { nameFormation,
        priceFormation,
        durationFormation
        } = req.body;

        try {
    
                    const formationNew = new Formation ({
                        UserId: req.user.id,
                        nameFormation,
                        priceFormation,
                        durationFormation
                    });
                    formationNew.save()
                    .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))
                    .catch(error => console.log(error))

    

        } catch (err) {
        
            res.status(400).send({
                err
            })   
        }
}

exports.getAll = (req, res) => {
 
    Formation.findAll()
    .then(formations => {
       
        res.status(200).json(formations);

    })
    .catch(error => console.log(error))
}


// exports.getOne = (req, res) => {


//     Formation.findOne(
//         {
//             where: {
//               UserId: req.params.id
//             }
//         }
//     ).then(formation => {
//         res.status(200).json(formation);
//         console.log(formation);
//     })
    
//     .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))

// }


exports.put = (req,res) => {
//console.log(req.params.id);
    Formation.update({
       
        nameFormation : req.body.nameFormation,
        priceFormation : req.body.priceFormation,
        durationFormation : req.body.durationFormation
    },{
            where : {
                id : req.params.id
            }
        }).then(() => res.status(200).json({
            message: 'Formation modifié !'
        }))
        .catch(error => res.status(400).json({
            message: 'Mauvaise requête !'
        }));
}

exports.delete = (req, res) => {

    Formation.destroy( {
         where : {
           id: req.params.id
         }
     })
     .then(() => res.status(200).json({
        message: 'Formation Supprimée !'
    }))
    .catch(error => res.status(400).json({
        message: 'Mauvaise requête !'
    }));
 
     
 }
