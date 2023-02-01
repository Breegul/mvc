let db = require("../database/connect");

class Friendship {

    constructor({friendship_id, first_friend_id, second_friend_id}){
        this.friendship_id = friendship_id;
        this.first_friend_id = first_friend_id;
        this.second_friend_id = second_friend_id;
    }

    static getAll(){

    }

    static getById(id){

    }
    
    static create(data){

    }

    static destroy(id){

    }
}