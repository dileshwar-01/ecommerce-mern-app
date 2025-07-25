import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';


//--------------------------------------------function for add product-------------------------------------------
const addProduct= async(req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestSeller}= req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images= [image1,image2,image3,image4].filter((item)=>item!=undefined);
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })
        )


        const productData ={
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller : bestSeller === 'true'? true: false ,
            sizes : JSON.parse(sizes),
            image: imagesUrl,
            date : Date.now()
        }

        const product = new productModel(productData);
        await product.save()

        res.json({success:true, message:"Product added"})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//-------------------------------------------function for list product--------------------------------------------------------
const listProducts= async(req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//-------------------------------------------function for removing product----------------------------------------
const removeProduct= async(req,res)=>{  
    try {
        await productModel.findByIdAndDelete(req.body.id); 
        res.json({success:true, message:"Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//----------------------------------------function for single product info-----------------------------------------------
const singleProduct= async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});
    } catch (error) {
        onsole.log(error)
        res.json({success:false, message:error.message})
    }
}

//---------------------------------------------function for edit product------------------------------------

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {price, sizes, bestSeller } = req.body;

     const updateFields = {};

    if (price !== undefined) updateFields.price = Number(price);
    if (sizes !== undefined) updateFields.sizes = JSON.parse(sizes);
    if (bestSeller !== undefined) updateFields.bestSeller = bestSeller === 'true';

    await productModel.findByIdAndUpdate(productId, updateFields);
    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {listProducts,removeProduct,addProduct,singleProduct, editProduct} ;