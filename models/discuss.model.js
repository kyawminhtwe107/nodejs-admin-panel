const db = require("../utils/database.js");
const moment = require("moment");

class Discuss {
    constructor(name, phone) {
        this.name = name
        this.phone = phone
    }

    static store(user_id, title, description) {
        let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        let sql = `INSERT INTO discusses (title,description,category_id,user_id,created_at,updated_at) 
                    VALUES('${title}','${description}','2','${user_id}','${date}','${date}')`;

        return db.execute(sql);
    }

    static fetchDiscuss(limit, page) {
        let sql = `SELECT discusses.*, users.name FROM discusses JOIN users ON users.id = discusses.user_id`;

        return db.execute(sql);
    }

    static findDiscuss(id) {
        let sql = ` SELECT discusses.*, users.name, COUNT(likes.discuss_id) as likes FROM discusses 
                    JOIN users ON users.id = discusses.user_id 
                    JOIN likes ON likes.discuss_id = discusses.id
                    WHERE  discusses.id =${id}
                    `;
        return db.execute(sql);
    }

    static destroy(id) {
        
    }
}

module.exports = Discuss;