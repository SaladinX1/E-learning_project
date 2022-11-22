const Formation = require('../Models/Formation');




exports.create = async (req, res, next) => {

    const { name,
        price,
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


exports.put = (req,res, next) => {



}

exports.delete = (req, res, next) => {



    
}