const { Router } = require("express");

const mushroomController = require("../controllers/mushroom");

// Handles all requests to /mushrooms
const mushroomRouter = Router();

// Route definitions
mushroomRouter.get("/", mushroomController.index); // /mushrooms/
mushroomRouter.get("/:id", mushroomController.show);
mushroomRouter.post("/", mushroomController.create);
mushroomRouter.delete("/:id", mushroomController.destroy);
mushroomRouter.patch("/:id", mushroomController.update);


module.exports = mushroomRouter