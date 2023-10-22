const express = require('express');
const db = require('./db');
const dotenv = require('dotenv');
const todoRouter = require("./routes/todo_route");
const userRouter = require('./users/user-router');
const taskRouter = require('./tasks/tasks-router')
const UserModel = require('./models/user.model');
const path = require('path');

dotenv.config();
const PORT = process.env.PORT

const templatePath = path.join(__dirname, "./templates")

const app = express();

// connection to mongodb
db.connect();

// middleware

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes


app.use(todoRouter);

app.use(userRouter);

app.use("/users", userRouter);

app.get('/users', async(req, res) => {
    const users = await UserModel.find({ gender: 'male' }).limit(3).select({ name: 1, _id: 1 })

    return res.json({
        users
    })
})

app.use("/tasks", taskRouter)

// server configurations...
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})