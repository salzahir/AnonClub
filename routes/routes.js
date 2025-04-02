const {Router} = require('express');
const router = Router();

const controller = require('../controllers/controller');

// GET home page
router.get('/', controller.getHome);

router.post("/login", (req, res) => {
    const {username, password} = req.body;
})

router.get("/signup", controller.getSignup);
router.post("/signup", controller.handlePostSignup);

module.exports = router;