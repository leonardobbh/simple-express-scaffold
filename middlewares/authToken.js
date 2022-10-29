const jwt = require("jsonwebtoken");
const { service } = require("../config");

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: { message: "No token provided" }});

    jwt.verify(token, service.jwt_token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: { message: "Token Expired" }});
        }

        req.decoded = jwt.decode(token);
        next();
    });
}

module.exports = authToken;