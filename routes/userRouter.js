const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//레이어 테스트용, 삭제 예정
router.get('/ping', userController.pong);

//회원가입API
router.post('/signup', userController.signUp);

//로그인API
router.post('/signin', userController.signIn);

//계정중복확인API
router.post('/userID', userController.checkIfIDExists);

//ID찾기API
router.post('/ID', userController.findID);

//비밀번호찾을 때 본인확인API
router.post('/password', userController.issueTokenTofindPassword);

//비밀번호재설정API
router.patch('/password', userController.resetPassword);

// router.post('/check', userController.check);

module.exports = router;
