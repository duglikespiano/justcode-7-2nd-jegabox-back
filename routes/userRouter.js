const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//레이어 테스트용, 삭제 예정
router.get('/ping', userController.pong);

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;
