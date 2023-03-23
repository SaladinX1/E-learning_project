const Module = require('../Models/Module');
const fs = require('fs'); 
const { json, where } = require('sequelize');
const Storage = require('node-storage');
// const app = require('../app');
// let sequelize = require('../Database/db.script');

exports.create =  (req, res) => {
    
    let docsSetId =  Math.random().toString(36).slice(2); 
     console.log('doc Set Id:', docsSetId);
     let docsArr = req.body.allDocsSelection.documents;
     console.log('docsArr', docsArr);
  
   const allDocs = docsSetId;

   const {
       nameModule,
       durationModule,
       role
    } = req.body.newModule;
    
        try {
                    const moduleNew = new Module ({
                        UserId: req.user.id,
                        nameModule,
                        durationModule,
                        allDocs,
                        role
                    });
                    moduleNew.save()
                    .then(res.status(201).json({message: 'Nouvelle Formation crée !'}))
                    exports.storeDocs(docsSetId, docsArr);


        } catch (err) {
        
            res.status(400).send({
                err
            })   
        }
        
  
}

exports.getAll = (req, res) => {
 
    Module.findAll()
    .then(modules => res.status(200).json(modules))
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


exports.storeDocs = ( docsSetId, docsArr) => {
    
    let storeDocs = new Storage(`../Frontend/docs/${docsSetId}`);
    console.log('set id:', docsSetId);
    
    try {
        
     
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

