import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order from cod
const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save();
    //remove user cart data after it
    await userModel.findByIdAndUpdate(userId,{cartData:{}});
    res.json({success:true,message:'Order Placed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//placing order from stripe
const placeOrderStripe = async(req,res)=>{

}

//placing order from razorpay
const placeOrderRazorpay = async(req,res)=>{

}
//All orders data from admin
const allOrders=async(req,res)=>{

}

//All user orders for frontend
const userOrders=async(req,res)=>{
try {
    const {userId}= req.body;
    const orders =await orderModel.find({userId});
    res.json({success:true,orders});
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

//update order status from admin panel
const updateStatus=async(req,res)=>{

}

export{placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders,userOrders, updateStatus}