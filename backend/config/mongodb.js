import mongoose, { mongo } from "mongoose";

const connectDB =async()=>{
   //whenever mogodb connection is established , this will execute and console 
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");  
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB;