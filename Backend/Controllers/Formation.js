const Formation = require('../Models/Formation');



exports.create =  (req, res, next) => {

    const { name,
        price,
        duration,
        file,
        file2,
        file3,
        file4,
        file5,
        file6,
        file7,
        file8,
        file9,
        file10 } = req.body;

        try {
    
                    const formationNew = new Formation ({
                        name,
                        price,
                        duration,
                        file,
                        file2,
                        file3,
                        file4,
                        file5,
                        file6,
                        file7,
                        file8,
                        file9,
                        file10
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
       
        name : req.body.name,
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
    .then( formation => 
        formation.destroy()
        .then(() => res.status(200).json({ message : "Formation supprimé !"}))
        .catch( err => res.status(400).json({ message : "Mauvaise requête !"}))
        )

    
}