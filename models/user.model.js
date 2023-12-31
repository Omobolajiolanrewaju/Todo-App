const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    name: { type: String, required: true},
    email: { type: String, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    }
})

// before save
UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
})

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

// after save

// before update

// after update

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;