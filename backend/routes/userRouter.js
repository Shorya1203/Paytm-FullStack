const express = require('express') ; 
const router = express.Router() ; 
const User = require('../db.js') ;
const authMiddlware = require('../middlewares/authMiddleware');
const JWT_SECRET = require('../config.js') ; 
const jwt = require('jsonwebtoken') ; 
const zod = require('zod') ; 


router.post('/signup', async (req, res) => {
    
    const username = req.body.username ; 
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName ; 
    const password = req.body.password ; 


    const userSchema = zod.object({
        firstName: zod.string().max(50, {message: "firstName can't be more than 50 characters long"}),
        lastName: zod.string().max(50, {message: "firstName can't be more than 50 characters long"}),
        username: zod.email({message: "username must be a valid email"}),
        password: zod.string().min(6, { message: "Password must be at least 6 characters long." })
    })

    const validationResult = userSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ 
            message: 'Validation failed.', 
            errors: validationResult.error.errors 
        });
    }

    try {
        const user = await User.findOne({ username});
        
        if (user) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const newUser = new User({username, firstName, lastName, password}) ; 

        const savedUser = await newUser.save() 
        
        res.status(200).json({
            userId: `${savedUser._id} has been created`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
    return ;
})

router.post('/signin', async (req, res) => {
    const username = req.body.username ; 
    const password = req.body.password ; 

    if(!username || !password) 
    {
        res.status(400).json({
            message: "username or password is required"  
        })
    }

    const user = await User.findOne({
        username, password
    })

    if(!user)
    {
        res.status(400).json({
            message: "Username or password is incorrect" 
        })
    }

    const token = jwt.sign({
        username
    }, JWT_SECRET) ; 

    res.status(200).json({
        token
    })
})

router.put('/', authMiddlware, async (req, res) => {

    const updateSchema = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional()
    })

    const validationResult = updateSchema.safeParse(req.body) ; 

    if(!validationResult.success)
    {
        res.status(400).json({
            message: "Incorrect Inputs"
        })
    }

    const password = req.body.password;  
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName ; 

    const username = req.user.username ; 

    try{
        const user = await User.updateOne({
            username
        }, {password, firstName, lastName})

        if(!user.acknowledged)
        {
            res.status(400).json({
                message: "Internal Server Error"  
            })
        }

        res.status(200).json({
            message: "Profile Updated Successfully"
        })
    }catch(error){
        return res.status(400).json({
            message: "Internal Server Error"
        })
    }

})

router.get('/bulk', authMiddlware, async (req, res) => {

    const filter = req.query.filter || "" ; 

    const users = await User.find({
        $or: [
            { firstName: {"$regex": filter, }},
            { lastName: {"$regex": filter}}
        ]
    });

    return res.json({
        user: users.map(user => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id 
            }
        })
    })

})
module.exports = router; 