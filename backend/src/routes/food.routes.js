const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage :multer.memoryStorage(), // Store files in memory as Buffer
})

// post  /api/food [protected route for food partner]
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]),foodController.createFood);

// post /api/stores/:storeId/foods [protected route for food partner]
router.post('/stores/:storeId/foods',authMiddleware.authFoodPartnerMiddleware,upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]),foodController.createFood);

// get /api/food [public route to get all food items]
router.get('/',foodController.getFoodItems);

// get /api/stores/:storeId/foods [public route to get food items by store for foodhome - image + name]
router.get('/stores/:storeId/foods',foodController.getFoodItemsForFoodHome);

// get /api/home/foods [public route to get food items for home page - video + name + description]
router.get('/home/foods',foodController.getFoodItemsForHome);

module.exports = router;