const express = require('express');
const router = express.Router();
const auth = require('../Midlewares/auth');
const formationCtrl = require('../Controllers/Formation');


//router.post('/postformation', auth, formationCtrl.createFormation);







module.exports = router;