const express = require('express');
const router = express.Router();
const PACtrl = require('../Controllers/ProduitsAchetes');

const auth = require('../Midlewares/auth');


router.post('/getuser/:id/formation', auth, PACtrl.postPA);
router.get('/getuser/:id/formations',auth, PACtrl.getPA);
router.get('/getuser/:id/formationprogress',auth, PACtrl.getPABought);
router.patch('/getuser/:id/formationprogress',auth, PACtrl.putPa);
router.delete('/removerelation/:id',auth, PACtrl.removeRelation,);




module.exports = router;