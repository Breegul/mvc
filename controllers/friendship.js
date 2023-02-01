const Friendship = require("../models/friendship");

async function index(req, res){
    const data = await Friendship.getAll();
    res.json(data);
}
async function show(req, res){
    const id = req.params.id;
    try {
        const data = await Friendship.getById(id);
        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate friendship ${id}`
        })
    }
}
async function create(req, res){
    const friendship = req.body;
    const data = await Friendship.create(friendship);
    return res.json("Done");
}
async function destroy(req, res){
    const id = req.params.id;
    try {
        const f = await Friendship.getById(id);
        const deleted = await f.destroy();
        // return friend ids/mushroom names
        res.json({message: "Friendship destroyed. You monster."});


    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate friendship ${id}`
        });
    }
}

module.exports = {
    index,
    show,
    create,
    destroy,
}