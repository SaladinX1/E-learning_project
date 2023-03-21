const Module = require('../Models/Module');
const fs = require('fs'); 
const { json, where } = require('sequelize');
const Storage = require('node-storage');
const app = require('../app');
let sequelize = require('../Database/db.script');



 let docsSetId =  Math.random().toString(36).slice(2); 

let storeDocs = new Storage(`../Frontend/docs/${docsSetId}`);

//let docsStore = [];

exports.create =  (req, res) => {


   // console.log('doc Set Id:', docsSetId);
  
   const allDocs = docsSetId;

   const {
       nameModule,
       durationModule,
       role
    } = req.body;
    
    // console.log( req.user.id,
    //    nameFormation,
    //    priceFormation,
    //    durationFormation,
    //    docs,
    //    role);
        try {
                    const formationNew = new Module ({
                        UserId: req.user.id,
                        nameModule,
                        durationModule,
                        allDocs,
                        role
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
 
    Module.findAll()
    .then(formations => res.status(200).json(formations))
    .catch(error => res.status(500).json({message:' Erreur Serveur :('}))
}


exports.getOne = (req, res) => {

console.log(req.params.id);

    Module.findOne(
        {
            where: {
              id: req.params.id
            }
        }
    ).then(module => res.status(200).json(module))   
    .catch(error => res.status(400).json({messsage: 'Mauvaise requête'}))
}


// exports.put = (req,res) => {

//     Module.update({
       
//         nameModule : req.body.nameModule,
//         durationModule : req.body.durationModule,
//         pdfs: req.body.pdfs
//     },{
//             where : {
//                 id : req.params.id
//             }
//         }).then(() => res.status(200).json({
//             message: 'Formation modifié !'
//         }))
//         .catch(error => res.status(400).json({
//             message: 'Mauvaise requête !'
//         }));
// }

exports.delete = (req, res) => {

    Module.destroy( {
         where : {
           id: req.params.id
         }
     })
     .then(() => res.status(200).json({ message: 'Module Supprimé !' })
     )
    .catch(error => res.status(400).json({
        message: 'Mauvaise requête !'
    }));
}


exports.storeDocs = (req,res) => {

    console.log(docsSetId);

    try {
        const docsArr = req.body.documents;
     
            for ( let sample of docsArr ) {

            
                for (let i = 0; i < docsArr.length; i++ ) {    
                    storeDocs.put(`${sample}`);
                }
            }

            if (docsArr == ' ') {
             return;
            }

      
    } catch (err) {
        console.log( 'Rendu erreur = ' + err);
       // console.log(e.msg);
    }
}



//  exports.deleteVideos = (req, res, next) => {

//     Formation.findOne({
//         where: {
//            videos: req.params.id
//         } 
//     })
//     .then( data => {

//         if(!data) {
//             res.status(200).json({message: 'Aucune vidéo à supprimer'});
//         } else {
//             videoStore.filter(idSet => {
//                 let id2Delete = idSet === data;
//                 if(id2Delete) { 
//                     app.delete(`C:/Users/Utilisateur/Desktop/folder clone/E-learning_project/Frontend/videos/${id2Delete}`);
//                 } 

//                 videoStore.filter(el =>{
//                     let refreshId = el !== id2Delete 
//                     videoStore.push(refreshId);        
//                     return videoStore;
//                      })

//              })
//             }
            
//             res.status(200).json({message: 'video(s) Suprimées'});

       
//     })
//     .catch(res.status(500).json({message: ' Erreur Serveur ...'}));
//     //  let videoSetIdTab = req.body.videos;
//     //  let idSet2Delete =  videoStore.filter(id => {return id != videoSetIdTab}); 
//     //  console.log(idSet2Delete);
//     // store.remove(idSet2Delete);
//   }

