const express = require("express");

const homeView = (req, res, next) => {
    res.render('index', { title: 'Home Page' });
}

module.exports = {
    homeView
}