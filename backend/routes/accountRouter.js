const express = require('express') ; 
const router = express.Router() ; 
const authMiddleware = require('../middlewares/authMiddleware.js');
const { User, Account } = require('../db.js');
const mongoose = require('mongoose') ; 
const zod = require('zod'); 


router.get('/balance', authMiddleware, async (req, res) => {
    const username = req.user.username ;  
    
    try{
        const user = await User.findOne({
            username
        }) ;
        
        const account = await Account.findOne({
            userId: user._id
        }) ; 

        const balance = account.balance; 

        return res.status(200).json({
            balance: `balance is ${balance}` 
        }) ; 
        
    }catch(err){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }  
})

router.post('/transfer', authMiddleware, async (req, res) => {

    // Transactions in MongoDB

    // We first create a session 
    // Now we will do multiple things together and if anyone fails revert back 

    try{
        const transferSchema = zod.object({
            amount: zod.number().positive(0),
            to: zod.email({message: "to username must be a valid email"})
        })

        const validationResult = transferSchema.safeParse(req.body); 

        if (!validationResult.success) {
            return res.status(400).json({ 
                message: 'Validation failed.', 
                errors: validationResult.error.errors 
            });
        }

        const session = await mongoose.startSession() ;

        session.startTransaction() ; 

        const {amount, to} = req.body ; 
        
        const fromUser = await User.findOne({
            username: req.user.username 
        }).session(session); 

        const fromAccount = await Account.findOne({
            userId: fromUser._id
        }).session(session) ; 

        if(!fromAccount || fromAccount.balance < parseInt(amount)) 
        {
            await session.abortTransaction() ; 
            return res.status(400).json({
                message: "Insufficient Balance" 
            }); 
        }

        const toUser = await User.findOne({
            username: to
        }).session(session) ; 

        

        const toAccount = await Account.findOne({
            userId: toUser._id
        }).session(session) ;

        if(!toAccount) 
        {
            await session.abortTransaction();
            return res.json({
                message: "Invalid Account"
            })
        }
        
        // Performing the Transaction
        await Account.updateOne({userId: fromUser._id}, {
            $inc: {
                balance: -parseInt(amount)
            }
        }).session(session) ; 

        await Account.updateOne({userId: toUser._id}, {
            $inc: {
                balance: parseInt(amount)
            }
        }).session(session) ;   

        // Commit the transaction
        await session.commitTransaction() ; 
        
        res.status(200).json({
            message: "Transfer Successful"
        });
    } catch(error){
        return res.status(500).json({
            "message": "Internal Server Error",
            "Error": error.message
        })
    }
   

})
module.exports = router