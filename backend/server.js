import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';


//APP CONFIG
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
//MIDDLEWARES
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/api/user', userRouter)
app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log('Server started at port: '+ port)
})