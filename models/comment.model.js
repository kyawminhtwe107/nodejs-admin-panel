const db = require("../utils/database.js");
const moment = require('moment');

class Comment {
    constructor(id, comment) {
        this.id = id
        this.comment = comment
    }

    static store(user_id,discuss_id,comment_id,comment) {
        let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        let sql = `INSERT INTO comments (user_id,discuss_id,comment_id,comment,created_at,updated_at) VALUES('${user_id}','${discuss_id}','${comment_id}','${comment}','${date}','${date}')`;

        return db.execute(sql);
    }

    static update(id,comment){
        let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        
        let sql = `UPDATE comments SET comment='${comment}', updated_at = '${date}' WHERE id=${id}`;

        return db.execute(sql);
    }

    static fetchDiscussComment(id) {
        let sql = `SELECT comments.*, users.name FROM comments JOIN users ON users.id = comments.user_id WHERE comments.discuss_id = ${id} ORDER BY created_at DESC`;

        return db.execute(sql);
    }

    static findComment(id){
        let sql = `SELECT * FROM comments WHERE id = ${id}`;

        return db.execute(sql);
    }

}

module.exports = Comment;