const TaskModel = require("../models/task.model")
const logger = require("../logger");

const homePageHandler = async (req, res) => {
    try {
        res.render("home")
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const loginHandler = async (req, res) => {
    try {
        res.render("login")
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}
  
const signUpHandler = async (req, res) => {
    try {
        res.render("signup")
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const todoPageHandler = async( req, res) => {
    try {
        const allTodo = await TaskModel.find();
        res.render("index", {todo: allTodo})
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const todoHandler = async (req, res) => {
    try {
        const {todo} = req.body
    const newTodo = new TaskModel({ todo })

    // Save Todo
    newTodo.save()

    .then(() => {
        console.log("Successfully added Todo")
        res.redirect('/todo')
    })
    .catch((err) => {
        console.log(err)
    })
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const {_id} = req.params;

    TaskModel.deleteOne({_id})

    .then(() => {
        console.log("Deleted Todo Successfully")

        res.redirect("/todo")
    })
    .catch((err) => {
        console.log(err)
    })
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

module.exports = {
    homePageHandler,
    signUpHandler,
    loginHandler,
    todoPageHandler,
    todoHandler,
    deleteTodo,
}