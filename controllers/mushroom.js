const { getOneById } = require("../models/mushroom");
const Mushroom = require("../models/mushroom");

function index(req, res) {
    const data = Mushroom.getAll();
    res.json(data);
}

function show(req, res) {
    const id = req.params.id;
    try {
        const data = Mushroom.getOneById(id);
        res.json(data);
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id ${id}`
        });
    }
    
}

function create(req, res) {
    const newMush = req.body;
    const data = Mushroom.create(newMush);
    return res.json(data);
}

function destroy(req, res) {
    const id = req.params.id;
    try {
        const m = Mushroom.getOneById(id);
        const deleted = m.delete();
        if(deleted){
            res.sendStatus(204);
        } else {
            throw new Error("Deletion failed.");
        }
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id ${id}`
        });
    }
}

function update(req, res) {
    const id = req.params.id;
    try {
        const m = Mushroom.getOneById(id);
        if(req.body.newRole){
            const newRole = req.body.newRole;

            if(newRole.length < 2){
                throw new Error("Invalid role");
            }
            const changed = m.changeRole(newRole);
        }

        if(req.body.newFriend){
            const friendId = req.body.newFriend;
            if(typeof friendId != "number"){
                throw new Error("New friend must be a single number id");
            }

            const mFriend = Mushroom.getOneById(friendId);
            m.makeFriends(friendId);
            mFriend.makeFriends(parseInt(id));
        }
        
        res.json(m);

    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            error: true,
            message: `Unable to locate mushroom with id ${id}`
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