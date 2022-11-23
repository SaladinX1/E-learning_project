const Formation = require('../Models/Formation');




exports.create = async (req, res, next) => {

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

            let formationCheck = await Formation.findOne(
                { where: {
                    name: req.body.name
                }}
            );
            if(formationCheck != null) {
                if(formationCheck.name == req.body.name) {
                    res.status(401).json({message: 'Désolé, ce nom de formation est déjà pris !'})
                } else {
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
                }
            }


        } catch {


        }



}

exports.getAll = (req, res, next) => {
 
    Formation.findAll()
    .then(res.status(200).json({message : 'Formations récupérées'}))
    .catch(error => console.log(error))
}


exports.getOne = (req, res, next) => {


    Formation.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    ).then(res.status(200).json({message:'Formation récupéré'}))
    .catch(res.status(400).json({messsage: 'Mauvaise requête'}))

}


exports.put = (req,res, next) => {

    User.update({
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



    
}