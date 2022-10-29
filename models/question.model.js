const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    type: { type: String, required: 'This field is required.', enum: ['code','choices'] },
    question: { type: String, required: 'This field is required.' },
    code: { type: String, required: 'This field is required.' }
}, { collection: 'question', timestamps: true } );

module.exports = mongoose.model('Question', QuestionSchema);