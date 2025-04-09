const {Router} = require('express');
const router = Router();

const controller = require('../controllers/controller');
const authController = require('../controllers/authcontroller');
const homeController = require('../controllers/homecontroller');

// GET home page
router.get('/', homeController.getHome);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.handlePostSignup);

router.get("/logout", authController.handleLogOut);

router.post("/messages/delete/:id", controller.handleDeleteMessage);
router.post("/messages/new", controller.handleNewMessage);
module.exports = router;