const {Router} = require('express');
const router = Router();

const messageController = require('../controllers/messagecontroller');
const authController = require('../controllers/authcontroller');
const homeController = require('../controllers/homecontroller');

// GET home page
router.get('/', homeController.getHome);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.handlePostSignup);

router.get("/logout", authController.handleLogOut);

router.post("/messages/delete/:id", messageController.handleDeleteMessage);
router.post("/messages/new", messageController.handleNewMessage);
module.exports = router;