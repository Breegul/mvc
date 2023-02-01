let db = require("../database/connect");

class Mushroom {

    constructor({ mushroom_id, mushroom_name, age, mushroom_role, mushroom_friends }) {
        this.id = mushroom_id;
        this.name = mushroom_name;
        this.age = age;
        this.role = mushroom_role;

    }

    static async query(q) {
        try {
            const res = await db.query(q);
            const r = Object.entries(res);
            console.log(r[0], r[1]);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    }

    static async getAll() {
        const q = { text: "SELECT * from mushroom;" };

        // Return all relevant data as mushroom objects
        const res = await this.query(q);
        return res.rows.map(m=>new Mushroom(m));
    }

    static async getOneById(id) {
        // Get the relevant mushroom
        const q = {
            text: "SELECT * FROM mushroom WHERE mushroom_id = $1", 
            values: [id]
        }

        const res = await this.query(q);
        const m = res.rows[0];

        if (m) {
            // Convert to mushroom object and return
            return new Mushroom(m);
        } else {
            throw new Error("Unable to find mushroom!");
        }
    }

    static async create(data) {
        const q = {
            text: "INSERT INTO mushroom(mushroom_name, age, mushroom_role) VALUES($1, $2, $3)",
            values: [data.mushroom_name, data.age, data.mushroom_role]
        }
        // test+add handling for empty values
        this.query(q);

    }

    async delete() {
        const q = {
            text: "DELETE FROM mushroom WHERE mushroom_id = $1",
            values: [this.id]
        };

        Mushroom.query(q);
        return this;
    }
    
    // Add changeName
    async changeRole(newRole) {
        const q = {
            text: "UPDATE mushroom SET mushroom_role = $1 WHERE mushroom_id = $2;",
            values: [newRole, this.id]
        }
        Mushroom.query(q);
        return this;
    }
    
    speak() {
        console.log(`The mushroom says its name is ${this.name}`);
    }
    
    // // Send req to /:id (m1) with body of friend (m2)
    // makeFriends(friendId){
    //     if(!this.friends.includes(friendId)){
    //         this.friends.push(friendId);
    //     }
    //     // currId = this.id;
    //     // db = db.map(m => m.id == friendId?m.friends.push(currId):m);

    // }
    // breakFriends(m1, m2){

    // }
}

module.exports = Mushroom;