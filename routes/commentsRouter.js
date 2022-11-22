const express = require('express');
const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/commentsController.js');

router.post('/addComment', mw.authMiddleware, controller.addComments);
router.get('/', controller.getComments);

// router.delete('/removecommnets', mw.authMiddleware, controller.removecommnets);

module.exports = router;
