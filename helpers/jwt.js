const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        jwt.verify(token, process.env.secretOrPrivateKey); //decode token if secret is correct et return the payload
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

function isAdmin(req, res, next) {
    try {
        const token = req.header('Authorization');
        const payload = jwt.verify(token, process.env.secretOrPrivateKey);

        if (payload.role === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ error: 'Not Allowed' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};