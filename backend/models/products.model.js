import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of Product is Required"]
    },

    price: {
        type: Number,
        required: [true, "Price of Product is Required"]
    },

    image: {
        type: String,
        required: [true, "Image Url of Product is Required"]
    },
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema)
export default Product