import Product from "../models/products.model.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        if (products.length === 0) {
            return res.status(500).json({ success: false, message: "No Products To Display", })
        }
        return res.status(200).json({ success: true, data: products, message: "Product Fetched Successfully" })
    }
    catch (error) {
        console.log("Error while Fetching Products:", error.message);
        return res.status(500).json({ success: false, message: "Server Error", })

    }
}

const createProducts = async (req, res) => {
    try {
        const { name, price, image } = req.body
        console.log("Requested Body:", req.body);
        
        if (!name || !price || !image) {
            return res.status(400).json({ success: false, message: "Please Provide All the Fields" })
        }

        const newProduct = await Product.create({
            name,
            price,
            image
        })

        if (!newProduct) {
            return res.status(400).json({ success: false, message: "Not Able Create New Product" })
        }

        return res.status(200).json({ success: true, data: newProduct, message: "Product Created Successfully" })
    }
    catch (error) {
        console.log("Error while Creating Products:", error.message);
        return res.status(500).json({ success: false, message: "Server Error", })
    }
}

const updateProducts = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }
        const { name, price, image } = req.body

        if (!name || !price || !image) {
            return res.status(400).json({ success: false, message: "Please Provide All the Fields" })
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            $set: {
                name,
                price,
                image
            }
        }, { new: true })

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        return res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated Successfully" })

    } catch (error) {
        console.log("Error while Updating Products:", error.message);
        return res.status(500).json({ success: false, message: "Product Not Found", })

    }
}

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Product Deleted Successfully" })

    } catch (error) {
        console.log("Error while Deleting Products:", error.message);
        return res.status(500).json({ success: false, message: "Product Not Found", })
    }

}

export  { getProducts, createProducts, updateProducts, deleteProducts }

