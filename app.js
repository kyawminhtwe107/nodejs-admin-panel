const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { attendanceRemiderJob } = require('./utils/cron');

const app = new express();

attendanceRemiderJob.start();

dotenv.config();

app.use(expressLayouts);

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'ejs');
app.set("layout signin", false);
app.set("layout extractScripts", true);

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

const homeRoute = require("./routes/home-route");
const userRoute = require("./routes/user-route");
const notificationRoute = require("./routes/notification-route");
const discussRoute = require("./routes/discuss-route");
const commentRoute = require("./routes/comment-route");

app.use(homeRoute.routes);
app.use(userRoute.routes);
app.use(notificationRoute.routes);
app.use(discussRoute.routes);
app.use(commentRoute.routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("Server running at port 8000");
});