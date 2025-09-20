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
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message:"food items fetched successfully",
        foodItems
    })
}
module.exports = {
    createFood,
    getFoodItems
}