const {Router} = require('express');
const router = Router();
const messageController = require('../controllers/messagecontroller');

router.post("/messages/delete/:id", messageController.handleDeleteMessage);
router.post("/messages/new", messageController.handleNewMessage);

module.exports = router;