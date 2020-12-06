const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({error: { code: 401, message: "Access Denied"}});
    }
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.organizationId = verified;
        next();
    } catch (err) {
        return res.status(400).send({error: { code: 400, message: "Invalid Token"}});
    }
}