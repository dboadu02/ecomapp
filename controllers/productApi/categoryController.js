import Category from "../../models/categoryModel.js";
import User from "../../models/userModel.js";


//creation of a new category by admins
export const createCategory = async (req, res) => {
    const userId = req.user.id
    const { name, description } = req.body;
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ message: "User not found." });
        }
        if (!name || !description) {
            return res.status(400).json({ message: "all fields are required." });
        }
        //check if there is already a category with the same name
        const existingCategory = await Category.findOne({ name })
        if(existingCategory) return res.status(400).json({ message: "Category already exists." });

        const newCategory = new Category(req.body)
        await newCategory.save();
 
        return res.status(201).json(newCategory);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
}


// Function to get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

//edit category details
export const editCategory = async (req, res) => {
    const {categoryId} = req.params
    const {name, description} = req.body

    try{
        const category = await Category.findById(categoryId)
        if(!category){
            res.status(404).json({message: 'category not found'})
        }

        category.name = name ?? category.name
        category.description = description ?? category.description

        await category.save()
        res.json('updated category', category)

    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: 'internal service error'})
    }
}


//delete category
export const deleteCategory = async (req, res) => {
    const {categoryId} = req.params

    try{
        const category = await Category.findByIdAndDelete(categoryId)
        if(!category){
            res.status(404).json({message: 'category not found'})
        }

        res.status(200).json({ message: "category deleted successfully" });

    }catch(err){
        console.log(err.message)
    }
}