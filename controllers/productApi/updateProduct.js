import Product from '../../models/productModel.js'
import fs from 'fs'

export const editProduct = async (req, res) => {
    const {id} = req.params
    const {name, price, description, stock, categoryId} = req.body

    
    try{
        const product = await Product.findById(id)
        if (!product) {
          res.status(404).json({ message: "Product not found!" });
          return;
        }

        product.name = name ?? product.name
        product.price = price ?? product.price
        product.description = description ?? product.description
        product.stock = stock ?? product.stock
        product.categoryId = categoryId ?? product.categoryId

        //remove old product image from server
        if(fs.existsSync(product.productImg)){
            fs.unlinkSync(product.productImg)
        }
        //assign path of incoming file to productImg
        product.productImg = req.file ? req.file.path : product.productImg

        await product.save()
        res.status(200).json({ meessage: "updated product", product });

    }catch(error){
        res.status(500).json({message: 'internal server error'})
    }
}