const { Router } = require("express");

const friendshipController = require("../controllers/friendship");

// Handles all requests to /friendships
const friendshipRouter = Router();

// Route definitions
friendshipRouter.get("/", friendshipController.index); // /friendships/
friendshipRouter.get("/:id", friendshipController.show);
friendshipRouter.post("/", friendshipController.create);
friendshipRouter.delete("/:id", friendshipController.destroy);
// friendshipRouter.patch("/:id", friendshipController.update);


module.exports = friendshipRouter