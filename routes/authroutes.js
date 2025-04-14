const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authcontroller');
const { signupValidators } = require('../utils/signupvalid');

router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", signupValidators, authController.handlePostSignup);
router.get("/logout", authController.handleLogOut);
router.get("/member", authController.getMember);
router.post("/member", authController.handleSetMember);

module.exports = router;
