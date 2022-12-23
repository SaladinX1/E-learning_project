const Formation = require('../Models/Formation');
const fs = require('fs'); 
const { json } = require('sequelize');
const Storage = require('node-storage');


exports.create =  (req, res) => {

    console.log(req.body.roles);

    const { nameFormation,
        priceFormation,
        durationFormation,
        role,
        pdfs
        } = req.body;

        try {
                    const formationNew = new Formation ({
                        UserId: req.user.id,
                        nameFormation,
                        priceFormation,
                        durationFormation,
                        role,
                        pdfs
                    });
                    formationNew.save()
                    .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))
                    .catch(error => res.status(400).json({message:' Mauvaise requête ...'}))


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
    .catch(error => res.status(500).json({message:' Erreur Serveur :('}))
}


exports.getOne = (req, res) => {

console.log(req.params.id);

    Formation.findOne(
        {
            where: {
              id: req.params.id
            }
        }
    ).then(formation => res.status(200).json(formation))
    
    .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))

}


exports.put = (req,res) => {

    Formation.update({
       
        nameFormation : req.body.nameFormation,
        priceFormation : req.body.priceFormation,
        durationFormation : req.body.durationFormation,
        pdfs: req.body.pdfs
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


 let videoSet = 0;

 exports.storeVideo = (req,res) => {

    try {
        const videosArr = req.body.videos;
        videoSet++;
       // for (let i = 0 ; i < videosArr.length; i++) {

            let store = new Storage(`C:/Users/Utilisateur/Desktop/folder clone/E-learning_project/Frontend/videos/videosFormation-${videoSet}`);

            for ( let sample of videosArr ) {


                for (let i = 0; i < videosArr.length; i++ ) {
        
                    store.put(`video-${i}`, `${sample}`);
        
               }
               
            }
    
      //  }
   
      
    } catch (err) {
        console.log( 'Rendu erreur = ' + err);
       // console.log(e.msg);
    }

 }

