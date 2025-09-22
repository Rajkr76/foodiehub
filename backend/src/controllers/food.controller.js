const foodModel = require('../models/food.model');
const storage = require('../services/storage.service');
const {v4:uuid} = require('uuid');

async function createFood(req,res){
    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await storage.uploadFile(req.file.buffer,uuid());

    console.log((fileUploadResult));

    const foodItem = await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner :req.foodPartner._id

    })

    res.status(201).json({
        mnessage:"food item created successfully",
        foodItem:{
            id:foodItem._id,
            name:foodItem.name,
            description:foodItem.description,
            video:foodItem.video,
            foodPartner:foodItem.foodPartner
        }
    })
}

async function getFoodItems(req,res)
{
    try {
        const { storeId } = req.query;
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

        // Normalize for frontend
        const result = foodItems.map(item => ({
            id: item._id,
            name: item.name,
            description: item.description || '',
            video: item.video,
            businessName: item.foodPartner?.businessName || '',
            address: item.foodPartner?.address || '',
            storeId: item.foodPartner?._id || '',
            createdAt: item.createdAt,
        }));

        res.status(200).json({
            message:"food items fetched successfully",
            foodItems: result
        })
    } catch (err) {
        console.error('getFoodItems error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    createFood,
    getFoodItems
}