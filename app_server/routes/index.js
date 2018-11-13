var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/', ctrlFood.homelist);
router.get('/food/delete/:id', ctrlFood.deleteFood);
router.get('/create_edit', ctrlFood.create);
router.get('/create_edit/:id', ctrlFood.loadEditData);

router.post('/create_edit', ctrlFood.create_item);
router.post('/create_edit/:id', ctrlFood.putItem);

module.exports = router;
