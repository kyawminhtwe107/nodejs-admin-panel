const express = require('express');
const router = express.Router();

const { sendNotificationView, sendnotificationAction } = require('../controllers/notificationController.js');

router.get('/send-notifications', sendNotificationView);
router.post('/notification', sendnotificationAction);

module.exports = {
    routes: router
}