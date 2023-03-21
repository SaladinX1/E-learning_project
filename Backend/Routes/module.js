
const express = require('express');
const router = express.Router();
const moduleCtrl = require('../Controllers/Module');
const auth = require('../Midlewares/auth')
const multer = require('../Midlewares/multer');


router.post('/createmodule', auth, multer, moduleCtrl.create);
router.delete('/deletemodule/:id', auth, moduleCtrl.delete);
//router.put('/putmodule/:id',auth, multer, moduleCtrl.put);
router.get('/modules',auth, moduleCtrl.getAll);
 router.get('/module/:id',auth, moduleCtrl.getOne);
 router.post('/docsFolder', auth, moduleCtrl.storeDocs);
 
module.exports = router;