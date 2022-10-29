const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: 'This field is required.' },
    description: { type: String },
    isDone: { type: Boolean, default: false, required: 'This field is required.' },
    questions: [ { type: Schema.Types.ObjectId, ref: 'Question' } ]
}, { collection: 'test', timestamps: true } );

module.exports = mongoose.model('Test', TestSchema);