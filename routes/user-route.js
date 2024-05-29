const express = require('express');
const router = express.Router();

const { userView, signinView, userCreateView, userEditView } = require('../controllers/userController.js');


router.get('/login', signinView);
router.get('/users', userView);
router.get('/users/create', userCreateView);
router.get('/users/:id/edit', userEditView);

module.exports = {
    routes: router
}