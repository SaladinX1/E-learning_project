const express = require('express');
const router = express.Router();
const PACtrl = require('../Controllers/ProduitsAchetes');

const auth = require('../Midlewares/auth');


router.post('/getuser/:id/formation', auth, PACtrl.postPA);
router.get('/getuser/:id/formations',auth, PACtrl.getPA);
router.delete('/removerelation/:id',auth, PACtrl.removeRelation,);

module.exports = router;