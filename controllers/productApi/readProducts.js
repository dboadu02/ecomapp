import Product from '../../models/productModel.js'


//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    if(!products){
        res.status(400).json({message: 'products not found'})
    }
    res.status(200).json(products)

  } catch(error){
    console.log(error.message)
  }
};




//get products by the category they belong to
export const getProductsByCategory = async (req, res) => {
    const {categoryId} = req.params

    try{
        //get all products with the category id
        const products = await Product.find({categoryId})
        res.status(200).json(products)

    }catch(err){
        console.log(err.message)
        res.status(500).json({ message: "Server error" });
    }
}


//get products by searching
export const getProductsByQuery = async (req, res) => {
    const {name} = req.query
    const filter = {}

    if(name){
        //assign names that match query ignoring case sensitive 
        filter.name = {$regex: name, $options:'i'}
    }

    try{
        const product = await Product.find(filter)
        if(!product){
            res.status(404).json({message: 'No products found'})
        }
        res.status(200).json(product)

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message})
    }
}