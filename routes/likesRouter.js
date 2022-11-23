const express = require('express');
const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/likesController');

router.post('/addlikes', mw.authMiddleware, controller.addLikes);
router.delete('/removelikes', mw.authMiddleware, controller.removelikes);

module.exports = router;
