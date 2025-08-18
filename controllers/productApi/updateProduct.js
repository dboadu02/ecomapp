import Product from '../../models/productModel.js'

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

        await product.save()
        res.status(200).json({ meessage: "updated product", product });

    }catch(error){
        res.status(500).json({message: 'internal server error'})
    }
}