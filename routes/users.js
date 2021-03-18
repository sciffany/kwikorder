const express = require('express');
const router = express.Router();

const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');

router.post('/signup', auth.signup);
router.post('/login', auth.login);

router.post('/', user.create);
router.get('/:id', user.read);
router.put('/:id', user.update);

module.exports = router;
