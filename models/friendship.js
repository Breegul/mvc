let db = require("../database/connect");

class Friendship {

    constructor({friendship_id, first_friend_id, second_friend_id}){
        this.friendship_id = friendship_id;
        this.first_friend_id = first_friend_id;
        this.second_friend_id = second_friend_id;
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

    static async getAll(){
        const q = { text: "SELECT * from friendship;"};
        const res = await this.query(q);
        return res.rows.map(f=>new Friend(f));
    }

    static async getById(id){
        const q = {
            text: "SELECT * FROM friendship WHERE friendship_id = $1",
            values: [id]
        }
        const res = await this.query(q);
        const f = res.rows[0];

        if (f) {
            return new Friendship(f);
        } else {
            throw new Error("Unable to find friendship :(");
        }
    }

    static async create(data){
        const q = {
            text: "INSERT INTO friendship(first_friend_id, second_friend_id) VALUES($1, $2);",
            values: [data.first_friend_id, data.second_friend_id]
        }

        this.query(q);
    }

    async destroy(){
        const q = {
            text: "DELETE FROM friendship WHERE friendship_id = $1",
            values: [this.friendship_id]
        };

        Friendship.query(q);
        return this;
    }
}

module.exports = Friendship;