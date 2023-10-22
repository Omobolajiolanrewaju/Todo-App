const mongoose = require('mongoose');
const shortid = require('shortid')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    todo: { type: String, required: true },
    status: {
        type: String, 
        required: true,
        enum: ['pending', 'completed', 'deleted'], 
        default: 'pending'
    }
})

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;