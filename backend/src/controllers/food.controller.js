const foodModel = require('../models/food.model');
const foodPartnerModel = require('../models/foodpartner.model');
const storage = require('../services/storage.service');
const {v4:uuid} = require('uuid');

async function createFood(req,res){
    try {
        console.log(req.foodPartner);
        console.log(req.body);
        console.log(req.files);

        const { name, price, description } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }
        
        if (!req.files?.image?.[0] || !req.files?.video?.[0]) {
            return res.status(400).json({ message: 'Both image and video files are required' });
        }

        const imageFile = req.files.image[0];
        const videoFile = req.files.video[0];

        // Upload both files to storage
        const [imageUploadResult, videoUploadResult] = await Promise.all([
            storage.uploadFile(imageFile.buffer, `img_${uuid()}`),
            storage.uploadFile(videoFile.buffer, `vid_${uuid()}`)
        ]);

        console.log('Upload results:', { imageUploadResult, videoUploadResult });

        const foodItem = await foodModel.create({
            name,
            price: Number(price),
            description,
            image: imageUploadResult.url,
            video: videoUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "food item created successfully",
            foodItem: {
                id: foodItem._id,
                name: foodItem.name,
                price: foodItem.price,
                description: foodItem.description,
                image: foodItem.image,
                video: foodItem.video,
                foodPartner: foodItem.foodPartner
            }
        });
    } catch (error) {
        console.error('createFood error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getFoodItems(req,res)
{
    try {
        const storeId = req.params.storeId || req.query.storeId;
        const query = {};
        if (storeId) {
            const isValid = /^[a-f\d]{24}$/i.test(storeId);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid storeId' });
            }
            query.foodPartner = storeId;
        }

        const foodItems = await foodModel
            .find(query)
            .populate({ path: 'foodPartner', select: 'businessName address' })
            .sort({ createdAt: -1 });

        // If no food items found but we have a valid storeId, get the food partner info
        let businessInfo = null;
        if (storeId && foodItems.length === 0) {
            businessInfo = await foodPartnerModel.findById(storeId).select('businessName address');
        }

        // Normalize for frontend
        const result = foodItems.map(item => ({
            _id: item._id,
            id: item._id,
            name: item.name,
            price: item.price,
            description: item.description || '',
            image: item.image,
            video: item.video,
            businessName: item.foodPartner?.businessName || '',
            address: item.foodPartner?.address || '',
            storeId: item.foodPartner?._id || '',
            createdAt: item.createdAt,
        }));

        res.status(200).json(result);
    } catch (err) {
        console.error('getFoodItems error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// For FoodHome page - return only image, name, id
async function getFoodItemsForFoodHome(req,res)
{
    try {
        const storeId = req.params.storeId;
        const query = {};
        if (storeId) {
            const isValid = /^[a-f\d]{24}$/i.test(storeId);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid storeId' });
            }
            query.foodPartner = storeId;
        }

        const foodItems = await foodModel
            .find(query)
            .select('name image _id') // Only select name, image, and id
            .sort({ createdAt: -1 });

        res.status(200).json(foodItems);
    } catch (err) {
        console.error('getFoodItemsForFoodHome error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// For Home page - return only video, name, description, id
async function getFoodItemsForHome(req,res)
{
    try {
        const foodItems = await foodModel
            .find({})
            .select('name video description _id') // Only select name, video, description, and id
            .populate({ path: 'foodPartner', select: 'businessName' })
            .sort({ createdAt: -1 });

        const result = foodItems.map(item => ({
            _id: item._id,
            id: item._id,
            name: item.name,
            description: item.description || '',
            video: item.video,
            businessName: item.foodPartner?.businessName || ''
        }));

        res.status(200).json(result);
    } catch (err) {
        console.error('getFoodItemsForHome error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    getFoodItemsForFoodHome,
    getFoodItemsForHome
}