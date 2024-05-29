const express = require("express");
const { Expo } = require('expo-server-sdk');
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Discuss = require("../models/discuss.model");

const sendNotification = (title, body, token) => {

    let expo = new Expo();

    let messages = [];

    messages.push({
        to: token,
        sound: 'default',
        title,
        body
    });

    console.log(messages);

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);

            } catch (error) {
            }
        }
    })();

} 

const commentNotification = async (discuss_id, user_id, commentText) => {

    const discuss = await Discuss.findDiscuss(discuss_id);
    const owner = await User.findUser(discuss[0][0].user_id);
    const commenter = await User.findUser(user_id);

    let ownerTitle = commenter[0][0].name + ' က သင်၏ ဆွေးနွေးမှုတွင် ပါဝင်ထားသည်။';
    let ownerBody = commentText.length > 50 ? commentText.substring(0, 50) + '...' : commentText;
    
    sendNotification(ownerTitle, ownerBody, owner[0][0].expo_push_token);

}

const replyNotification = async (comment_id, user_id, commentText) => {

    const comment = await Comment.findComment(comment_id);
    const owner = await User.findUser(comment[0][0].user_id);
    const commenter = await User.findUser(user_id);

    let ownerTitle = commenter[0][0].name + '  က သင်၏ ဆွေးနွေးမှုကို အကြောင်းပြန်ထားသည်။';
    let ownerBody = commentText.length > 50 ? commentText.substring(0, 50) + '...' : commentText;

    sendNotification(ownerTitle, ownerBody, owner[0][0].expo_push_token);

}

const store = async (req, res, next) => {

    const { user_id, discuss_id, comment_id, comment } = req.body;

    if(comment_id === 0){
        commentNotification(discuss_id,user_id,comment);
    }
    else{
        commentNotification(discuss_id, user_id, comment);
        replyNotification(comment_id,user_id,comment)
    }
    
    try {
        let data = await Comment.store(user_id,discuss_id,comment_id,comment);

        res.status(201).json({ status: 'ok' });
    }
    catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {

    const { id, user_id, comment } = req.body;

    try{
        let data = await Comment.update(id,comment);

        res.status(201).json({ status: 'ok'});
    }
    catch(err){
        next(err);
    }
    
}

const userCreateView = async (req, res, next) => {
    res.render('user/create', { title: 'Create User View' });
}

module.exports = {
    store,
    update
}