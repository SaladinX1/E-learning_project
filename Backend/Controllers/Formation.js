const Formation = require('../Models/Formation');
const fs = require('fs'); 
const { json, where } = require('sequelize');
const Storage = require('node-storage');
const app = require('../app');
let sequelize = require('../Database/db.script');
 const pdfParse = require("pdf-parse");


let videoSetId =  Math.random().toString(36).slice(2); 
 let filesSetId =  Math.random().toString(36).slice(2); 
let store = new Storage(`../Frontend/videos/${videoSetId}`);
let store2 = new Storage(`../Frontend/textFiles/${filesSetId}`);
let videoStore = [];
let filesStore = [];

exports.create =  (req, res) => {

   // console.log(req.file);
    
   // console.log(req.body.picture);

    const videos = videoSetId;
    const pdfs = filesSetId;
 //  console.log(req.file.filename); 
   // const { picture } =  `${req.protocol}://${req.get('host')}/Frontend/images/${req.file.filename}`;
    

    const {
         nameFormation,
        priceFormation,
        picture,
        durationFormation,
        role
        } = req.body;

        try {
                    const formationNew = new Formation ({
                        UserId: req.user.id,
                        nameFormation,
                        priceFormation,
                        durationFormation,
                        picture,
                        videos,
                        pdfs,
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
    
   // console.log(req.body.videos);

   // console.log(videoSetId);

    try {
        const videosArr = req.body.videos;
     
            for ( let sample of videosArr ) {
                
                
                for (let i = 0; i < videosArr.length; i++ ) {
                    
                    store.put(`${sample}`);
                    
                }
                
            }

            if (videosArr == ' ') {
                videoStore.push(null);
            } else {
                
                videoStore.push(videoSetId);

            }

   console.log(videoStore);
      
    } catch (err) {
        console.log( 'Rendu erreur = ' + err);
       // console.log(e.msg);
    }

 }




 exports.storeFiles = (req, res) => { 

  //  console.log(req.body.files);

    try {
        const filesArr = req.body.files;
     
            for ( let sample of filesArr ) {
                
                
                for (let i = 0; i < filesArr.length; i++ ) {
                    
                    store2.put(`${sample}`);
                    
                }
                
            }

            if (filesArr == ' ') {
                filesStore.push(null);
            } else {
                console.log(filesSetId);
                filesStore.push(filesSetId);

            }

  // console.log(filesStore);
      
    } catch (err) {
        console.log( 'Rendu erreur = ' + err);
       // console.log(e.msg);
    }
 }

 
//  let textTab = [];
//  exports.pdfsTreatment = (req,res, next) => {

//     const pdfs = req.body.files;
//     let pathPdfs = [];
//    // console.log(pdfs);
//     for (let pdf of pdfs) {

//        let formatPath = pdf.replace('C:\\fakepath\\', '..\\Frontend\\pdfsData\\');
//        pathPdfs.push(formatPath);
//     //console.log(document.URL);
//        // console.log(formatPath);

//     }
    
//    // console.log(pathPdfs);

//     let dataTextTab = [];
//         for (let path of pathPdfs) {
//             let pdfFile = fs.readFileSync(path);

//             // obtenir l'information  
//             pdfParse(pdfFile).then(function (data) {

//                 let dataText = data.text;

//                 console.log(dataText);
//                     return dataText;
//                 //    console.log(dataTextTab);
                
//                  })
//         }

//  }

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

//   exports.getVideos = (req, res, next) => {

//     console.log(req.params.id);

//     Formation.findOne({
//             where: {
//             id : req.params.id
//         }
//     })
//     .then(data => {

//         console.log(data);
//         res.status(200).json(data.videos);

//         // if(!data) {
//         //     res.status(200).json({message: 'Aucune vidéo disponible'})
//         // } else {
//         //     videoStore.filter(idSet => {
//         //         if(idSet === data) {
                    
//         //             fetch(`C:/Users/Utilisateur/Desktop/folder clone/E-learning_project/Frontend/videos/${data}`)
//         //             .then(videoSet => {
//         //                 res.status(200).json({message: 'vidéos récupérés', data: videoSet})
//         //             })
//         //             .catch(res.status(500).json({message: 'Erreur local path...'}))
//         //         }
//         //      })
     
             
//         // }
        
//     })
//     .catch(res.status(500).json({message: 'Erreur Serveur ...'}))


//   }