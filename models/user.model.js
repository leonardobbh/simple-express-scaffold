const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: { type: String, required: 'This field is required.' },
    email: { type: String, required: 'This field is required.' },
    password: { type: String, required: 'This field is required.' }
}, { collection: 'user', timestamps: true } );

module.exports = mongoose.model('User', UserSchema);