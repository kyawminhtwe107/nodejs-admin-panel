const express = require('express');
const router = express.Router();

const { store, update } = require('../controllers/commentController.js');


router.post('/comments', store);
router.put('/comments/:id', update);

module.exports = {
    routes: router
}