const Formation = require('../Models/Formation');
const fs = require('fs'); 
const FileStore = require('fs-store').FileStore;
const ffmpeg = require('ffmpeg');


exports.create =  (req, res) => {

    const { nameFormation,
        priceFormation,
        durationFormation,
        pdfs
        } = req.body;

        try {
           
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

//     let pdfPath = `../../Frontend/videos`;
//   // if the file does not exist


//   if (!fs.existsSync(pdfPath)) {
//     console.log(`The PDF does NOT exist @ ${pdfPath}`)
//     return res.json({ success: false });
//   }

//   res.download(pdfPath, (err) => {
//     if (err) {
//       console.log('there was error in res.downoad!', err)
//     } else {
//       fs.unlink(pdfPath, (err) => {
//         if (err) {
//           console.log('there was error in unlinking the pdf file!', err)
//         } else {
//           console.log('success!')
//         }
//       })
//     }
//   })
 }

