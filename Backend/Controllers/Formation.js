const Formation = require('../Models/Formation');



exports.create =  (req, res, next) => {

    const { nameFormation,
        price,
        duration
        } = req.body;

        try {
    
                    const formationNew = new Formation ({
                        nameFormation,
                        price,
                        duration
                    });
                    formationNew.save()
                    .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))
                    .catch(error => console.log(error))

                    // Formation.findOne({ where: {
                    //     id: req.body.id
                    // }}).then(res.status(200).json({id: res.id}))
                    // .catch(err => console.log(err))

        } catch (err) {
        
            res.status(400).send({
                err
            })   
        }
}

exports.getAll = (req, res, next) => {
 
    Formation.findAll()
    .then(formations => {
       
        res.status(200).json(formations);

    })
    .catch(error => console.log(error))
}


// exports.getOne = (req, res, next) => {


//     Formation.findOne(
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     ).then(formation => res.status(200).json(formation))
//     .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))

// }


exports.put = (req,res, next) => {

    Formation.update({
       
        nameFormation : req.body.namePut,
        price : req.body.price,
        duration : req.body.duration
    },{
            where : {
                id : req.params.id
            }
        })
}

exports.delete = (req, res, next) => {

    Formation.findOne( {
         where : {
             id: req.params.id
         }
     })
     .then( result => 
         result.destroy()
         .then(() => res.status(200).json({ message : "Formation supprimé !"}))
         .catch( err => res.status(400).json({ message : "Mauvaise requête !"}))
         )
 
     
 }
