const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { asyncWrap } = require('../utils/myutils.js');

//회원가입API
router.post('/signup', asyncWrap(userController.signUp));

//로그인API
router.post('/signin', asyncWrap(userController.signIn));

//계정중복확인API(회원가입용)
router.post('/userID', asyncWrap(userController.checkIfIDExists));

//ID찾기API
router.post('/ID', asyncWrap(userController.findID));

//계정삭제API
router.delete('/ID', asyncWrap(userController.deleteAccount));

//비밀번호 찾기 할 때 인증번호 요청API
router.post(
  '/validateNumber1',
  asyncWrap(userController.requestValidateNumber)
);

//본인인증을 위한 인증번호 발송API(마이페이지 화면 진입 시)
router.post('/validateNumber2', asyncWrap(userController.sendValidateNumber));

//본인인증을 위한 인증번호 발송API(회원정보 수정 시)
router.post('/validateNumber3', userController.sendValidateNumber2);

//인증번호 확인API(비밀번호 찾기)
router.patch('/validateNumber', asyncWrap(userController.checkValidateNumber));

//비밀번호재설정API(로그인 화면에서 비밀번호 찾기 할 때)
router.patch('/password1', asyncWrap(userController.resetPassword1));

//비밀번호재설정API(마이페이지에서 비밀번호 변경 할 때)
router.patch('/password2', asyncWrap(userController.resetPassword2));

//마이페이지불러오기
router.post('/mypage', asyncWrap(userController.requestMypage));

//마이페이지수정
router.patch('/mypage', asyncWrap(userController.modifyMypage));

//인증번호 확인API(마이페이지 전화번호 수정)
router.patch('/validateNumber2', userController.checkValidateNumber2);

module.exports = router;
