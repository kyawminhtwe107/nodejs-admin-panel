const express = require("express");
const Discuss = require("../models/discuss.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const moment = require('moment');

const { sendNotificationAll, sendNotificationToUser } = require('../controllers/notificationController');

const { Expo } = require('expo-server-sdk');

const discussView = async (req, res, next) => {
    try {
        let discusses = await Discuss.fetchDiscuss(25, 1);

        res.render('discuss/discuss', { discusses: discusses[0] })
    }
    catch (err) {
        next(err);
    }
}

const discussDetailView = async (req, res, next) => {

    const id = req.params.id
    
    try {
        let discuss = await Discuss.findDiscuss(id);
        let comments = await Comment.fetchDiscussComment(id);

        let createDate = moment.utc(discuss[0][0].created_at).local().startOf('seconds').fromNow()

        res.render('discuss/detail', { discuss: discuss[0][0], createDate, comments: comments[0] })
    }
    catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    res.render('discuss/create', { title: 'Create Discuss View' });
}

const store = async (req, res, next) => {

    const { user_id, title, description } = req.body;

    let messages = [];

    try {
        await Discuss.store(user_id,title,description);

        const users = await User.fetchRandomUser(1000);

        const body = description.toString().replace(/<\/?[^>]+(>|$)/g, "").substring(0,100) + '...';

        users[0].map((user,index) => {

            if (Expo.isExpoPushToken(user.expo_push_token)) {
                sendNotificationToUser(title, body, user.expo_push_token)
            }
            
        });
        

        res.status(201).json({ status: 'ok' });
    }
    catch (err) {
        next(err);
    }
}

const discussEditView = async (req, res, next) => {

    const id = req.params.id

    try {
        const discuss = await Discuss.findDiscuss(id);

        res.render('discuss/edit', { discuss: discuss[0][0] })
    }
    catch (err) {
        next(err);
    }
}

const destroy  = async (req,res,next) => {
    const id = req.params.id;

    try{
        await Discuss.destroy(id);

        res.status(200).send({status:'ok'});
    }
    catch(error){
        
    }
    
}


module.exports = {
    discussView,
    discussDetailView,
    create,
    store,
    discussEditView
}