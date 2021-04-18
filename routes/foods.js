const express = require('express');
const router = express.Router();

const auth = require('../controllers/AuthController');
const food = require('../controllers/FoodController');

router.post('/', auth.protect, auth.restrictTo('Owner', 'Admin'), food.create);
router.get(
  '/find',
  auth.protect,
  auth.restrictTo('Owner', 'Admin'),
  food.readAll
);
router.get('/:id', auth.protect, auth.restrictTo('Owner', 'Admin'), food.read);
router.put(
  '/:id',
  auth.protect,
  auth.restrictTo('Owner', 'Admin'),
  food.update
);
router.delete(
  '/:id',
  auth.protect,
  auth.restrictTo('Owner', 'Admin'),
  food.delete
);

module.exports = router;
