const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/Users');
const auth = require('../Midlewares/auth')



router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/destroyuser/:id',auth, userCtrl.deleteUser);
router.patch('/updateuser/:id',auth, userCtrl.putUser)
router.put('/updateaccess/:id', auth, userCtrl.putAccess);
router.get('/getuser/:id',auth, userCtrl.getUser);


module.exports = router;