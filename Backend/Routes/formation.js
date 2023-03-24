const express = require('express');
const router = express.Router();
const auth = require('../Midlewares/auth');
const formationCtrl = require('../Controllers/Formation');


router.post('/postformation', auth, formationCtrl.createFormation);
router.get('/formations', auth, formationCtrl.getallFormations );
router.get('/formation/:id', auth, formationCtrl.getOneFormation);






module.exports = router;