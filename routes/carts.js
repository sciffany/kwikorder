const express = require('express');
const router = express.Router();

const cart = require('../controllers/CartController');

router.post('/', cart.create);
router.delete('/:id', cart.delete);
router.get('/:id', cart.read);

router.delete('/:id', cart.delete);
router.put('/:id', cart.update);

module.exports = router;
