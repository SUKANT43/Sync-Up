const express=require('express');
const router=express.Router();

const authMiddleware=require('../middleware/authMiddleware');
const {addProduct}=require('../controllers/productController');

router.post('/add',authMiddleware,addProduct);


module.exports=router;