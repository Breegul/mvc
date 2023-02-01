const Mushroom = require("../models/mushroom");

async function index(req, res) {
    const data = await Mushroom.getAll();
    res.json(data);
}

async function show(req, res) {
    const id = req.params.id;
    try {
        const data = await Mushroom.getOneById(id);
        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id ${id}`
        });
    }
    
}

async function create(req, res) {
    const newMush = req.body;
    const data = await Mushroom.create(newMush);
    return res.json(data);
}

async function destroy(req, res) {
    const id = req.params.id;
    try {
        const m = await Mushroom.getOneById(id);
        const deleted = await m.destroy();
        
        res.json({message: m.name + " destroyed. You monster."});


    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id ${id}`
        });
    }
}

async function update(req, res) {
    const id = req.params.id;
    try {
        let m = await Mushroom.getOneById(id);

        const newRole = req.body.newRole;
        if(newRole && newRole.length < 2){
            throw new Error("Invalid role");
        } else if (newRole) {
            m = await m.changeRole(newRole);
        }
        console.log("m", m);
        res.json(m);

    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: e
        });
    }
}

// function friend(req, res){
//     const currId = req.params.id;
//     try {
//         const newFriend = req.body.newFriend;

//     } 
// }

module.exports = {
    index,
    show,
    create,
    destroy,
    update,
    // friend,
}