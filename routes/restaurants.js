const express = require('express');
const router = express.Router();

const auth = require('../controllers/AuthController');
const restaurant = require('../controllers/RestaurantController');

router.route('/').post(auth.protect, restaurant.create);
router.get('/:id', restaurant.read);
router.put('/:id', restaurant.update);
router
  .route('/:id')
  .delete(auth.protect, auth.restrictTo('Owner', 'Admin'), restaurant.delete);

module.exports = router;
