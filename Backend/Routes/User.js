const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/Users');



router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/destroyuser/:id', userCtrl.deleteUser);
router.put('/updateuser/:id', userCtrl.putUser)
router.get('/getuser/:id', userCtrl.getUser);
// router.post()
// router.get()

module.exports = router;