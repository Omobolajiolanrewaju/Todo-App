const fs = require("fs").promises;
const path = require("path");

const itemsFilePath = path.join(__dirname, "items-db.json");

//================ Get all item ========================
const getAllItem = async (req, res) => {
  const items = await fs.readFile(itemsFilePath);
  res.status(200).send(JSON.parse(items));
};

//================ Get one item ========================
const getOneItem = async (req, res) => {
  try {
    const itemsDB = await fs.readFile(itemsFilePath);
    const items = JSON.parse(itemsDB);

    const id = req.params.id;
    const itemIndex = id - 1;
    const itemNeeded = items[itemIndex];

    if (itemNeeded === undefined) {
      res.status(404).json({
        error: "Item not found.",
      });
    }

    res.status(200).json(itemNeeded);
  } catch (error) {
    post.status(500);
  }
};

//================ Post an item ========================
const addItem = async (req, res) => {
  const itemsDB = await fs.readFile(itemsFilePath);
  const items = JSON.parse(itemsDB);

  const itemToAdd = req.body;
  const lastItemId = items[items.length - 1].id;
  const newItemId = lastItemId + 1;
  const newItem = { ...itemToAdd, id: newItemId };
  items.push(newItem);

  await fs.writeFile(itemsFilePath, JSON.stringify(items), (err) => {
    if (err) {
      post.status(500);
    }
  });

  res.status(200).json(newItem);
};

//================ Put an item ========================
const updateItem = async (req, res) => {
  // Get the original list of items
  const itemsDB = await fs.readFile(itemsFilePath);
  const items = JSON.parse(itemsDB);

  // The
  const itemToUpdate = req.body;

  // Gets the file that we need to update
  const id = req.params.id;
  const itemIndex = id - 1;

  const updatedItem = { ...items[itemIndex], ...itemToUpdate };
  items[itemIndex] = updatedItem;

  await fs.writeFile(itemsFilePath, JSON.stringify(items), (err) => {
    if (err) {
      post.status(500);
    }
  });

  res.json(updatedItem);
};

//================ Delete an item ========================
const deleteItem = async (req, res) => {
  // Get the original list of items
  const itemsDB = await fs.readFile(itemsFilePath);
  const items = JSON.parse(itemsDB);

  // Gets the file that we need to delete
  const id = req.params.id;
  const itemIndex = id - 1;
  const itemNeeded = items[itemIndex];

  if (itemNeeded === undefined) {
    return res.status(404).json({
      error: "Item not found.",
    });
  }

  items.splice(itemIndex, 1);

  await fs.writeFile(itemsFilePath, JSON.stringify(items), (err) => {
    if (err) {
      post.status(500);
    }
  });

  res.status(200).send("Item deleted successfully!!!");
};

module.exports = {
  getAllItem,
  getOneItem,
  addItem,
  updateItem,
  deleteItem,
};