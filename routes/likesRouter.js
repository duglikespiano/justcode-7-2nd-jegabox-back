const express = require('express');
const router = express.Router();
const controller = require('../controllers/likesController');

router.post('/addlikes', controller.addLikes);
router.delete('/removelikes', controller.removelikes);

module.exports = router;
