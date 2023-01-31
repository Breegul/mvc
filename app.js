const express = require("express");
const cors = require("cors");
const mushroomRouter = require("./routers/mushroom");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route definitions
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Mushroom API."
    })
})

app.use("/mushrooms", mushroomRouter);

module.exports = app;