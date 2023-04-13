const express = require('express');
const router = express.Router();
const PACtrl = require('../Controllers/ProduitsAchetes');
const auth = require('../Midlewares/auth');
const multer = require('../Midlewares/multer');

router.post('/getuser/:id/formation', auth, multer, PACtrl.postPA);
router.get('/getuser/:id/formations',auth, PACtrl.getPA);

module.exports = router;