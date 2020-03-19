const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Mejor asi
const authorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});
*/
const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author',authorSchema);