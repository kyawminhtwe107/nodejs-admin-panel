const express = require('express');
const router = express.Router();

const { homeView } = require('../controllers/homeController.js');

router.get('/', (req, res) => {
    res.redirect('/home');
});
router.get('/home', homeView);

module.exports = {
    routes: router
}