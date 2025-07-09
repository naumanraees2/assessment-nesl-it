// Middleware: authorize roles
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mySecretKey';
const customMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

module.exports = customMiddleware