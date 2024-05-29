db = require("../utils/database.js");

class User {
    constructor(name,phone){
        this.name = name
        this.phone = phone
    }

    static store(){
        let d = new Date();

        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
    }

    static fetchUser(limit,page){
        let sql = `SELECT * FROM users`;

        return db.execute(sql);
    }

    static fetchRandomUser(limit){
        let sql = `SELECT * FROM users WHERE expo_push_token IS NOT NULL ORDER BY RAND() LIMIT ${limit}`;
        return db.execute(sql);
    }

    static findUser(id){
        let sql = `SELECT * FROM users WHERE  id =${id}`;
        return db.execute(sql);
    }
}

module.exports = User;