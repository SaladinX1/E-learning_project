const jwt = require('jsonwebtoken');
const User = require('../Models/User');


module.exports = ( req, res, next ) => {
     
     try{
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'HARD_SECRET_TOKEN');
        const userId = verifyToken.userId;
        User.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            if(!user) {
                return res.status(401).json({ message: 'requête non autorisé'})

            } else {
                req.user = user
                next();
            }
        })
     }
     catch {
            return res.status(400).json({
                error: new Error('la requête est invalide !')
            });
     }
}