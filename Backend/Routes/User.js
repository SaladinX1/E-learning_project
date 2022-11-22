const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/Users');
const auth = require('../Midlewares/auth')



router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/destroyuser/:id',auth, userCtrl.deleteUser);
router.put('/updateuser/:id',auth, userCtrl.putUser)
router.get('/getuser/:id',auth, userCtrl.getUser);


module.exports = router;