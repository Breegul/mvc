let db = require("../database/connect");

class Friendship {

    constructor({friendship_id, first_friend_id, second_friend_id}){
        this.friendship_id = friendship_id;
        this.first_friend_id = first_friend_id;
        this.second_friend_id = second_friend_id;
    }

    static async getAll(){
        const res = await db.query("SELECT * from friendship;");
        return res.rows.map(f=>new Friend(f));
    }

    static async getById(id){
        const res = await db.query("SELECT * FROM friendship WHERE friendship_id = $1", [id]);

    }

    static async create(data){

    }

    static async destroy(id){

    }
}