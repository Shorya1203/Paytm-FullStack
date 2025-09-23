const express = require('express') ; 
const router = express.Router() ; 
const userRouter = require('./userRouter.js') ;
const accountRouter = require('./accountRouter.js') ;

router.use('/user', userRouter) ;
router.use('/account', accountRouter) ; 

module.exports = router;