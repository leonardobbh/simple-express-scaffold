const User = require('../models/user.model');
const argon2 = require('argon2');

const getAllUser = async (req, res, next) => {    
    try {
        const resultUser = await User.find({}, { __v: false, deleted: false, createdAt: false, updatedAt: false });
        return res.status(200).json(resultUser).end();
    } catch (err) {
        return res.status(400).json({ error: { exception: err } }).end();
    }
};

const getOneUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const resultUser = await User.findById(id, { __v: false, deleted: false, createdAt: false, updatedAt: false });
        return res.status(200).json(resultUser).end();
    } catch (err) {
        return res.status(400).json({ error: { exception: err } }).end();
    }
};

const postUser = async (req, res, next) => {
    const { body } = req;

    const passwordHashed = await argon2.hash(body.password);

    body.password = passwordHashed;
    
    User.create(body, (err, result) => {
        if (err) return res.status(400).json({ error: { exception: err } }).end();
        return res.status(200).json({ message: "Created with success", newid: result._id }).end();
    });
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
        User.findOneAndUpdate({ _id: id }, body, (err, result) => {
            if (err) return res.status(400).json({ error: { exception: err } }).end();
            return res.status(200).json({ message: "Updated with success" }).end();
        });
    } catch (err) {
        return res.status(400).json({ error: { exception: err } }).end();
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        User.delete({ _id: id }, (err, result) => {
            if (err) return res.status(400).json({ error: { exception: err } }).end();
            return res.status(200).json({ message: "Deleted with success" }).end();
        });
    } catch (err) {
        return res.status(400).json({ error: { exception: err } }).end();
    }
};

module.exports = {
    getAllUser,
    getOneUser,
    postUser,
    updateUser,
    deleteUser
};