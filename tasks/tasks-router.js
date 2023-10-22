const express = require("express");
const controller = require("./tasks-controller");
const bodyParser = require("body-parser");
const globalMiddleware = require("../middleware/global-middleware");

const router = express.Router();

router.use(bodyParser.json());

// router.use(globalMiddleware.basicAuth)
router.use(globalMiddleware.bearerTokenAuth);

// Add Task
router.post("/", globalMiddleware.adminAuth, controller.addItem);

// Get one Task
router.get("/:id", controller.getOneItem);

// Get all Task
router.get("/", controller.getAllItem);

// Update Task
router.put("/:id", globalMiddleware.adminAuth, controller.updateItem);

// Delete Task
router.delete("/:id", globalMiddleware.adminAuth, controller.deleteItem);

module.exports = router;