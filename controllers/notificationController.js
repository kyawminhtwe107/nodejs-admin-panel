const express = require("express");
const { Expo } = require('expo-server-sdk');
const moment = require('moment');

const LearningTIme = require("../models/learningTime.model");

const sendNotificationView = (req, res, next) => {
    res.render('notification/send', { title: 'Send Notification View' });
}

const sendNotificationAll = async (messages) => {

    let expo = new Expo();

    let chunks = expo.chunkPushNotifications(messages);

    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);

                tickets.push(...ticketChunk);
                
            } catch (error) {
                console.error(error);
            }
        }
    })();

}

const attendanceRemiderNoti = async (req, res, next) => {

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];

    const today = moment().day();

    const hour = moment().add(2, 'hours').format('H:mm');

    let messages = [];

    console.log(hour);
    
    try {
        let times = await LearningTIme.fetchLearningTime(days[today],hour);

        console.log(times[0]);

        times[0].map((time,index) => {

            let hour = '';

            const timeArr = time.hour.split(':');

            if(timeArr[0] >= 12){
                hour = (timeArr[0] - 12 )+':'+timeArr[1]+' PM'
            }
            else{
                hour = timeArr[0] + ':' + timeArr[1] + ' AM'
            }

            let title = 'မဂ်လာပါ '+ time.name;
            let body = 'ဒီနေ့ ' + hour + ' မှာ ဂျပန်စာသင်တန်းရှိတယ်နော်..';
            
            if (Expo.isExpoPushToken(time.expo_push_token) ){
                sendNotificationToUser(title,body,time.expo_push_token)
            }
            
        });
    }
    catch (err) {
        next(err);
    }
}

const sendnotificationAction = (req, res, next) => {

    let expo = new Expo();

    const { title, body, token } = req.body;

    let messages = [];

    messages.push({
        to: token,
        sound: 'default',
        title,
        body,
        data: { withSome: 'data' },
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);

                res.status(200).json({status:'ok'});
                
            } catch (error) {
                console.error(error);
                res.status(500).json({error:'something wrong'});
            }
        }
    })();

} 

const sendNotificationToUser = (title, body, token) => {

    let expo = new Expo();

    let messages = [];

    messages.push({
        to: token,
        sound: 'default',
        title,
        body
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);

            } catch (error) {
                console.error(error);
            }
        }
    })();

} 

module.exports = {
    attendanceRemiderNoti,
    sendNotificationView,
    sendnotificationAction,
    sendNotificationToUser,
    sendNotificationAll
}