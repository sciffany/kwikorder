const express = require('express');
const router = express.Router();

const user = require('../controllers/UserController');

router.post('/', user.create)
router.get('/:id', user.read)
router.put('/:id', user.update)

module.exports = router;

