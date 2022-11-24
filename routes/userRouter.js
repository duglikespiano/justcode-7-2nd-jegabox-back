const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//회원가입API
router.post('/signup', userController.signUp);

//로그인API
router.post('/signin', userController.signIn);

//계정중복확인API(회원가입용)
router.post('/userID', userController.checkIfIDExists);

//ID찾기API
router.post('/ID', userController.findID);

//계정삭제API
router.delete('/ID', userController.deleteAccount);

//비밀번호 찾기 할 때 인증번호 요청API
router.post('/validateNumber1', userController.requestValidateNumber);

//본인인증을 위한 인증번호 발송API(마이페이지 화면 진입 시)
router.post('/validateNumber2', userController.sendValidateNumber);

//본인인증을 위한 인증번호 발송API(회원정보 수정 시)
router.post('/validateNumber3', userController.sendValidateNumber2);

//인증번호 확인API(비밀번호 찾기)
router.patch('/validateNumber', userController.checkValidateNumber);

//인증번호 확인API(마이페이지 전화번호 수정)
router.patch('/validateNumber2', userController.checkValidateNumber2);

//비밀번호재설정API(로그인 화면에서 비밀번호 찾기 할 때)
router.patch('/password1', userController.resetPassword1);

//비밀번호재설정API(마이페이지에서 비밀번호 변경 할 때)
router.patch('/password2', userController.resetPassword2);

//마이페이지불러오기
router.post('/mypage', userController.requestMypage);

//마이페이지수정
router.patch('/mypage', userController.modifyMypage);

module.exports = router;
