const cron = require('node-cron');

const moment = require('moment');

const { attendanceRemiderNoti } = require('../controllers/notificationController');

// const job = cron.schedule('*/5 6-18/6 * * *', function () {
//     attendanceRemiderNoti();
// });

const attendanceRemiderJob = cron.schedule("*/5 * * * *", function () {

    const time = moment().format('H:mm');

    console.log(time);
    
    attendanceRemiderNoti();
    
});

// const attendanceRemiderJob = cron.schedule("*/15 * * * * *", function () {
//     const time = moment().format('hh:mm');
//     const minFormat = moment().format('mm');

//     const hour = moment().add(2, 'hours').format('hh:mm');

//     if (minFormat == '45' || minFormat == '30' || minFormat == '15' || minFormat == '00'){
//         notiJob.start();
//         // attendanceRemiderJob.stop();

//         console.log(minFormat);
//     }
// });

module.exports = { attendanceRemiderJob };