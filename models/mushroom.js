let db = require("../database/connect");

class Mushroom {

    constructor({ id, name, species, age, role, friends }) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.role = role;
        this.friends = friends;

    }

    static async getAll() {

        // Return all relevant data as mushroom objects
        const res = await db.query("SELECT * from mushroom;");
        console.log(res);
        return [];
    }

    static getOneById(id) {

        // Get the relevant mushroom
        const m = db.find(m => m.id == id);

        if (m) {
            // Convert to mushroom object and return
            return new Mushroom(m);
        } else {
            throw new Error("Unable to find mushroom!");
        }
    }

    static create(data) {

        data.id = db.length + 1;
        db.push(data);
        return new Mushroom(data);
    }

    delete() {

        db = db.filter(m => m.id != this.id);
        return true;
    }

    speak() {

        console.log(`The mushroom says its name is ${this.name}`);
    }

    changeRole(newRole) {
        this.role = newRole;

        db = db.map(m => m.id == this.id ? this : m);

        return this;
    }

    // Send req to /:id (m1) with body of friend (m2)
    makeFriends(friendId){
        if(!this.friends.includes(friendId)){
            this.friends.push(friendId);
        }
        // currId = this.id;
        // db = db.map(m => m.id == friendId?m.friends.push(currId):m);

    }
    breakFriends(m1, m2){

    }
}

module.exports = Mushroom;