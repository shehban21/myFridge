var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/food', ctrlFood.getFood);
router.get('/food/:id', ctrlFood.getFoodById);
router.post('/food', ctrlFood.postFood);
router.delete('/food/:id', ctrlFood.deleteFood);
router.put('/food/:id', ctrlFood.putFood);

module.exports = router;