const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    if (token.startsWith('Bearer ')) {
        // Elimina "Bearer " del string para obtener solo el token
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id; // Añade el ID del usuario al objeto de solicitud
        next();
    });
};

module.exports = {
    verifyToken
};