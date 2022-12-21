const Formation = require('../Models/Formation');
const fs = require('fs'); 
const FileStore = require('fs-store').FileStore;
const ffmpeg = require('ffmpeg');
const { json } = require('sequelize');


exports.create =  (req, res) => {

    const { nameFormation,
        priceFormation,
        durationFormation,
        pdfs
        } = req.body;

        try {
        
            // const { videosSelection } = req.body;

            // var process = new ffmpeg('../Frontend/videos');
    
            // for ( let videos in videosSelection) {
            //     for (let video of videos) {
    
            //         process.then(function (video) {
                
            //             video
            //             .setVideoSize('640x?', true, true, '#fff')
            //             .setAudioCodec('libfaac')
            //             .setAudioChannels(2)
            //             .save('/path/to/save/your_movie.avi', function (error, file) {
            //                 if (!error)
            //                     console.log('Video file: ' + file);
            //             });
                
            //         }, function (err) {
            //             console.log('Error: ' + err);
            //         });
    
            //     }
            // }


                    const formationNew = new Formation ({
                        UserId: req.user.id,
                        nameFormation,
                        priceFormation,
                        durationFormation,
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



 exports.storeVideo = (req,res) => {

let processTab = [];
    
    try {
        const videosArr = req.body.videos;

        
         console.log(videosArr);

       for ( let video of videosArr) {
       // console.log(video);
       
        var process = new ffmpeg(`${video}`);
        console.log(process);
        processTab.push(process);
        console.log(processTab);
        
    }
    
            // process.then(function (video) {
        
            //     video
            //     //.setVideoSize('640x?', true, true, '#fff')
            //    // .setAudioCodec('libfaac')
            //     //.setAudioChannels(2)
            //     .save('../../Frontend/videos', function (error, file) {
            //         if (!error)
            //             console.log('Video file: ' + file);
            //     });
        
            // }, function (err) {
            //     console.log('Error: ' + err);
            // });
        
            
      
    } catch (e) {
       // console.log(e.code);
       // console.log(e.msg);
    }

 }

