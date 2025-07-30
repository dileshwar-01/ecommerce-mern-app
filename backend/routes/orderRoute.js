import express from 'express';
import {placeOrder, placeOrderStripe,verifyStripe, placeOrderRazorpay, allOrders,userOrders, updateStatus} from '../controllers/orderController.js' 
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment feature
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//user features
orderRouter.post('/userorders',authUser,userOrders)

//payment veify
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;