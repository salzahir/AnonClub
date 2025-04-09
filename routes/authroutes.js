const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authcontroller');

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.handlePostSignup);
router.get("/logout", authController.handleLogOut);

module.exports = router;
