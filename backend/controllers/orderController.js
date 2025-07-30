import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const currency = 'inr'  //usd
const deliveryCharge =10

//gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    try {
        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;
        const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"Stripe",
        payment:false,
        date: Date.now()
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save();

    const line_items = items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount :item.price * 100
        },
        quantity :item.quantity
    }))  

    line_items.push({
         price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount :deliveryCharge * 100
        },
        quantity :1
    })

    const session= await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',
    })

    res.json({success:true,session_url:session.url})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//verify stripe
const verifyStripe = async(req,res)=>{
    const{userId,orderId,success} = req.body;
    try {
        if(success === "true"){
              console.log("✅ Stripe Payment SUCCESS");
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true});
        }else{
              console.log("✅ Stripe Payment FAIL");
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//placing order from razorpay
const placeOrderRazorpay = async(req,res)=>{

}
//All orders data from admin
const allOrders=async(req,res)=>{
try {
    const orders = await orderModel.find({
      $or: [
        { paymentMethod: "COD" },
        { paymentMethod: "Stripe", payment: true }
      ]
    });
    res.json({success:true, orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

//All user orders for frontend
const userOrders=async(req,res)=>{
try {
    const {userId}= req.body;
     const orders = await orderModel.find({
      userId,
      $or: [
        { paymentMethod: "COD" },
        { paymentMethod: "Stripe", payment: true }
      ]
    });
    res.json({success:true,orders});
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

//update order status from admin panel
const updateStatus=async(req,res)=>{
    try {
        const{orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true, message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export{placeOrder, placeOrderStripe,verifyStripe, placeOrderRazorpay, allOrders,userOrders, updateStatus}