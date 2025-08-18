import Product from '../../models/productModel.js'


export const deleteProduct = async (req, res) => {
    const {id} = req.params

    try{
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message: 'product not found'})
        }

        res.status(200).json({message: 'Product successfully deleted'})

    }catch(err){
        console.log(err.message)
    }
}