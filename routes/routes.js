const {Router} = require('express');
const router = Router();

const controller = require('../controllers/controller');
const authController = require('../controllers/authcontroller');

// GET home page
router.get('/', controller.getHome);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.handlePostSignup);

router.get("/logout", authController.handleLogOut);

router.post("/messages/delete/:id", controller.handleDeleteMessage);
router.post("/messages/new", controller.handleNewMessage);
module.exports = router;