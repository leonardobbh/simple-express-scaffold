const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const { service } = require('../config');

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    let role;

    if ((!email) || (!password)) {
        return res.status(401).json({ message: "Bad formatted JSON" });
    }

    const resultUser = await User.findOne({ email: email });

    if (resultUser) {
        if (await argon2.verify(resultUser.password, password)) {
            const token = jwt.sign({
                user: {
                    nome: resultUser.nome,
                    email: resultUser.email
                },
                exp: Math.floor(Date.now() / 1000) + (60 * 120) // Expira em 2 horas
            }, service.jwt_token);

            return res.status(200).json({ message: "Authenticated with success", accessToken: token });
        } else {
            return res.status(401).json({ message: "Invalid Password" });
        }
    } else {
        return res.status(401).json({ message: "Invalid E-mail" });
    }
};


module.exports = {
    postLogin
};