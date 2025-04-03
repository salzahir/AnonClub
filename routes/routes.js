const {Router} = require('express');
const router = Router();

const controller = require('../controllers/controller');

// GET home page
router.get('/', controller.getHome);

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/signup", controller.getSignup);
router.post("/signup", controller.handlePostSignup);

router.get("logout", controller.handleLogOut);
module.exports = router;