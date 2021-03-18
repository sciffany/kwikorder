const express = require('express');
const router = express.Router();

const cart = require('../controllers/CartController');

router.put('/add', cart.addFood);
router.put('/update', cart.updateFood);
router.put('/status', cart.update);

router.post('/', cart.create);
router.delete('/:id', cart.delete);
router.get('/:id', cart.read);

module.exports = router;
