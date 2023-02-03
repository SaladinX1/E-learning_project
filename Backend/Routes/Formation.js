
const express = require('express');
const router = express.Router();
const formationCtrl = require('../Controllers/Formation');
const auth = require('../Midlewares/auth')
const multer = require('../Midlewares/multer');


router.post('/createFormation', auth, multer, formationCtrl.create);
router.delete('/deleteFormation/:id', auth, formationCtrl.delete);
router.put('/putFormation/:id',auth, multer, formationCtrl.put);
router.get('/formations',auth, formationCtrl.getAll);
 router.get('/formation/:id',auth, formationCtrl.getOne);
 router.post('/docsFolder', auth, formationCtrl.storeDocs);
 //router.delete('/deleteVideos/:id', auth, formationCtrl.deleteVideos);
 
module.exports = router;