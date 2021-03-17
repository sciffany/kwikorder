const express = require('express');
const router = express.Router();

const restaurant = require('../controllers/RestaurantController');

router.post('/', restaurant.create)
router.get('/:id', restaurant.read)
router.put('/:id', restaurant.update)
router.delete('/:id', restaurant.delete)



module.exports = router;
