const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: false,    // Prevents XSS attacks by blocking JS access
        secure: true,      // Only sent over HTTPS
        sameSite: 'lax',   // Allows some cross-site requests (like from links)
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })

}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if (!user) {
        return res.status(400).json({
            message: "email or password is incorrect"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "email or password is incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: false,    // Prevents XSS attacks by blocking JS access
        secure: true,      // Only sent over HTTPS
        sameSite: 'lax',   // Allows some cross-site requests (like from links)
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "user logged out successfully"
    });
}

async function registerFoodPartner(req, res) {
    try {
        console.log('Food partner registration attempt:', req.body);
        const { businessName, email, password, phone, contactName, address } = req.body;

        if (!businessName || !email || !password || !phone || !contactName || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isfoodPartnerAlreadyExists = await foodPartnerModel.findOne({ email });

        if (isfoodPartnerAlreadyExists) {
            return res.status(400).json({
                message: "food partner already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            businessName,
            email,
            password: hashedPassword,
            phone,
            contactName,
            address
        })

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: false,    // Prevents XSS attacks by blocking JS access
            secure: true,      // Only sent over HTTPS
            sameSite: 'lax',   // Allows some cross-site requests (like from links)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: "food partner registered successfully",
            foodPartner: {
                id: foodPartner._id,
                email: foodPartner.email,
                businessName: foodPartner.businessName,
                phone: foodPartner.phone,
                contactName: foodPartner.contactName,
                address: foodPartner.address
            }
        })
    } catch (error) {
        console.error('Error in registerFoodPartner:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function loginFoodPartner(req, res) {
    try {
        console.log('Food partner login attempt:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            console.log('Food partner not found:', email);
            return res.status(400).json({
                message: "email or password is incorrect"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

        if (!isPasswordValid) {
            console.log('Invalid password for food partner:', email);
            return res.status(400).json({
                message: "email or password is incorrect"
            })
        }

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: false,    // Prevents XSS attacks by blocking JS access
            secure: true,      // Only sent over HTTPS
            sameSite: 'lax',   // Allows some cross-site requests (like from links)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "food partner logged in successfully",
            foodPartner: {
                id: foodPartner._id,
                email: foodPartner.email,
                businessName: foodPartner.businessName,
            }
        })
    } catch (error) {
        console.error('Error in loginFoodPartner:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "food partner logged out successfully"
    })
}

async function getFoodPartner(req, res) {
    try {
        const { storeId } = req.params;
        
        if (!storeId) {
            return res.status(400).json({
                message: "Store ID is required"
            });
        }

        const foodPartner = await foodPartnerModel.findById(storeId).select('-password');
        
        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            });
        }

        res.status(200).json({
            id: foodPartner._id,
            businessName: foodPartner.businessName,
            email: foodPartner.email,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName,
            address: foodPartner.address
        });
    } catch (error) {
        console.error('Error in getFoodPartner:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getFoodPartner
}