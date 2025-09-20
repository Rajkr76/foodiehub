const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage :multer.memoryStorage(),
})

// post  /api/food [protected route for food partner]

router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood);

// get /api/food [public route to get all food items]

router.get('/',authMiddleware.authUserMiddleWare,foodController.getFoodItems);

module.exports = router;