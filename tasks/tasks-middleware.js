const express = require("express");
const controller = require("./tasks-controller");
const bodyParser = require("body-parser");
const globalMiddleware = require("../middleware/global-middleware");

const router = express.Router();

router.use(bodyParser.json());

// router.use(globalMiddleware.basicAuth)
router.use(globalMiddleware.apiKeyAuth);

// Add Items
router.post("/", globalMiddleware.adminAuth, controller.addItem);

// Get one Item
router.get("/:id", controller.getOneItem);

// Get all items
router.get("/", controller.getAllItem);

// Update Item
router.put("/:id", globalMiddleware.adminAuth, controller.updateItem);

// Delete item
router.delete("/:id", globalMiddleware.adminAuth, controller.deleteItem);

module.exports = router;