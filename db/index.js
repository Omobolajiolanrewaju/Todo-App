const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connect = (url) => {
    mongoose.connect(url || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Todo_list');

    mongoose.connection.on("connected", () => {
        console.log("Connected to Database successfully.");
    });

    mongoose.connection.on("error", (err) => {
        console.log("There was an error connecting to the database.");
        console.log(err);
    });
}

module.exports = {
    connect
}