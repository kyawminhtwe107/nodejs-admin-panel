db = require("../utils/database.js");

class LearningTime {
    constructor(name, phone) {
        this.name = name
        this.phone = phone
    }

    static store() {
        let d = new Date();

        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
    }

    static fetchLearningTime(today,hour) {

        let sql = `SELECT day,name,hour,expo_push_token FROM learning_times LEFT JOIN users ON users.id = learning_times.user_id WHERE day='${today}' AND hour='${hour}'`;
        
        return db.execute(sql);
    }

    static findUser(id) {
        let sql = `SELECT * FROM users WHERE  id =${id}`;
        return db.execute(sql);
    }
}

module.exports = LearningTime;