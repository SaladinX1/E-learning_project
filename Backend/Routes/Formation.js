
const express = require('express');
const router = express.Router();
const formationCtrl = require('../Controllers/Formation');
const auth = require('../Midlewares/auth')



router.post('/createFormation', auth,  formationCtrl.create);
router.delete('/deleteFormation/:id', auth, formationCtrl.delete);
router.put('/putFormation/id',auth,  formationCtrl.put);
router.get('/formations',auth,  formationCtrl.getAll);
router.get('/formation/:id',auth,  formationCtrl.getOne);

module.exports = router;