const express = require('express');
const router = express.Router();

const food = require('../controllers/FoodController');

router.post('/', food.create);
router.get('/find', food.readAll);
router.get('/:id', food.read);
router.put('/:id', food.update);
router.delete('/:id', food.delete);

module.exports = router;
