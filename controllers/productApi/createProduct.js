import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';


export const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body
    const { categoryId } = req.params

    try{
        //validate required fields
        if (!name || !price || !stock || !description) {
            return res.status(400).json({ message: 'Name, price, and category ID are required' });
        }
        //check if the category exists
        const catergory = await Category.findById(categoryId)
        if (!catergory) {
            return res.status(404).json({ message: 'Category not found, select a different category or create one' });
        }

        //check if there is already a product existing with this exact name
        const product = await Product.findOne({name})
        if(product){
            res.status(400).json({message: 'a product with this name exists'})
        }

        //create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            categoryId: categoryId
        });

        await newProduct.save();
        res.json(newProduct)

    }catch (error) {
        console.log(error.message)
        return res.status(400).json({ message:  'internal server error' });
    }

}

