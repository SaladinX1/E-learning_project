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
        
    //     console.log(formations.id);
    //     let idFormation = [];
        
    //    for (let id of formations.id) {
    //      idFormation.push(id);
    //      return idFormation;
    //    }
    //     console.log(idFormation);
    
    })
    .catch(error => console.log(error))
}


exports.getOne = (req, res, next) => {


    Formation.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    ).then(formation => res.status(200).json(formation))
    .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))

}


exports.put = (req,res, next) => {

    Formation.update({
        email : req.body.email,
        password : updatedPassword,
        name : req.body.name,
        secondName : req.body.secondName,
        telephone : req.body.telephone,
        documentType : req.body.documentType,
        autorisationDocument : req.body.autorisationDocument},{
            where : {
                id : req.params.id
            }
        })



}

exports.delete = (req, res, next) => {
console.log(req.body.name);
   Formation.findOne( {
        where : {
            name: req.body.name
        }
    })
    .then( formation => 
        formation.destroy()
        .then(() => res.status(200).json({ message : "Formation supprimé !"}))
        .catch( err => res.status(400).json({ message : "Mauvaise requête !"}))
        )

    
}