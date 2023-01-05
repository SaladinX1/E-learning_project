
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
 router.post('/videofolder', auth, formationCtrl.storeVideo);
 router.delete('/deleteVideos', auth, formationCtrl.deleteVideos);
// router.post('/videofolder', auth, formationCtrl.storeVideo);
 

module.exports = router;