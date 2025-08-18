import Router from "express";
import {createCategory, getCategories, editCategory, deleteCategory, createProduct, getAllProducts, getProductsByCategory, getProductsByQuery, editProduct, deleteProduct} from "../controllers/productApi/barrel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkAdmin from "../middlewares/checkAdminStatus.js";


const productRouter = Router();

productRouter
  .post("/category/create", authMiddleware, checkAdmin, createCategory) // Create a new category
  //allows admins to create a new product
  .post("/product/create/:categoryId", authMiddleware, checkAdmin, createProduct)

  //users should be able to access products without being registered
  .get("/categories", getCategories) // Get all categories
  .get("/products", getAllProducts)
  .get("/products/:categoryId", getProductsByCategory)
  .get("/product/search", getProductsByQuery) 

  .put("/category/edit/:categoryId",authMiddleware, checkAdmin, editCategory)
  .put("/product/edit/:id",authMiddleware, checkAdmin, editProduct)
  

  .delete("/category/delete/:categoryId",authMiddleware, checkAdmin, deleteCategory)
  .delete("/product/delete/:id",authMiddleware, checkAdmin, deleteProduct)
    

export default productRouter