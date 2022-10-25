const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/Users');



router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/destroyuser', userCtrl.deleteUser);
router.put('/updateuser', userCtrl.putUser)
router.get('/getuser', userCtrl.getUser);
// router.post()
// router.get()

module.exports = router;