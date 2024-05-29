const express = require('express');
const router = express.Router();

const { discussView, discussDetailView, create, store, discussEditView } = require('../controllers/discussController.js');


router.get('/discusses', discussView);
router.get('/discusses/:id/detail', discussDetailView);
router.get('/discusses/create', create);
router.post('/discusses', store);
router.get('/discusses/:id/edit', discussEditView);

module.exports = {
    routes: router
}