const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const shortid = require('shortid')

const User = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    name: { type: String, required: true}
})

module.exports = User;