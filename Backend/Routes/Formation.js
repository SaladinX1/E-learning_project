
const express = require('express');
const router = express.Router();
const formationCtrl = require('../Controllers/Formation');
const auth = require('../Midlewares/auth')



router.post('/createFormation', auth,  formationCtrl.create);
router.delete('/deleteFormation', auth, formationCtrl.delete);
router.put('/putFormation',auth,  formationCtrl.put);
router.get('/formations',auth,  formationCtrl.getAll);
router.get('/formation',auth,  formationCtrl.getOne);

module.exports = router;