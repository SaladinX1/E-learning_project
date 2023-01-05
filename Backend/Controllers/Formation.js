const Formation = require('../Models/Formation');
const fs = require('fs'); 
const { json, where } = require('sequelize');
const Storage = require('node-storage');




let videoSetId =  Math.random().toString(36).slice(2); 
let store = new Storage(`C:/Users/Utilisateur/Desktop/folder clone/E-learning_project/Frontend/videos/videosFormation-${videoSetId}`);
let videoStore = [];

exports.create =  (req, res) => {
    
    console.log(req.body.picture);

    const videos = videoSetId;

    const { nameFormation,
        priceFormation,
        durationFormation,
        picture,
        role,
        pdfs
        } = req.body;

        try {
                    const formationNew = new Formation ({
                        UserId: req.user.id,
                        nameFormation,
                        priceFormation,
                        durationFormation,
                        picture,
                        videos,
                        role,
                        pdfs
                    });
                    formationNew.save()
                    .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))
                   


        } catch (err) {
        
            res.status(400).send({
                err
            })   
        }
}

exports.getAll = (req, res) => {
 
    Formation.findAll()
    .then(formations => res.status(200).json(formations))
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
        picture: req.body.pictureF,
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
     .then(() => res.status(200).json({ message: 'Formation Supprimée !' })
     )
    .catch(error => res.status(400).json({
        message: 'Mauvaise requête !'
    }));
}


exports.storeVideo = (req,res) => {
    

     console.log(videoSetId);

    try {
        const videosArr = req.body.videos;
        // for (let i = 0 ; i < videosArr.length; i++) {
            
          //  let store = new Storage(`C:/Users/Utilisateur/Desktop/folder clone/E-learning_project/Frontend/videos/videosFormation-${videoSetId}`);
            
            for ( let sample of videosArr ) {
                
                
                for (let i = 0; i < videosArr.length; i++ ) {
                    
                    store.put(`video-${i}`, `${sample}`);
                    
                }
                
            }
            videoStore.push(videoSetId);
    
      //  }
   console.log(videoStore);
      
    } catch (err) {
        console.log( 'Rendu erreur = ' + err);
       // console.log(e.msg);
    }

 }


 exports.deleteVideos = (req, res, next) => {
     
     let videoSetIdTab = req.body.videos;
     let idSet2Delete =  videoStore.filter(id => {return id != videoSetIdTab}); 
     console.log(idSet2Delete);
        
    store.remove(idSet2Delete);
    
              
       
         

  }