const express = require('express');
const router = express.Router();

const auth = require('../controllers/AuthController');
const restaurant = require('../controllers/RestaurantController');

router
  .route('/')
  .post(auth.protect, auth.restrictTo('Owner', 'Admin'), restaurant.create);

router.get('/:id', auth.protect, restaurant.read);

router.get(
  '/',
  auth.protect,
  auth.restrictTo('Owner', 'Admin'),
  restaurant.readAll
);

router.put(
  '/:id',
  auth.protect,
  auth.restrictTo('Owner', 'Admin'),
  restaurant.update
);

router
  .route('/:id')
  .delete(auth.protect, auth.restrictTo('Owner', 'Admin'), restaurant.delete);

module.exports = router;
