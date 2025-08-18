import Router from 'express'
import { createCartItem, updateCartItem, getCartItems, clearCartItems, deleteCartItem} from '../controllers/cartApis/barrel.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const cartRouter = Router()

cartRouter
        .post("/cart/create/:productId", authMiddleware, createCartItem)
        .get("/cart/view", authMiddleware, getCartItems)
        
        .put("/cart/edit/:productId/:type",authMiddleware, updateCartItem)
        .delete("/cart/clear",authMiddleware, clearCartItems)
        .delete("/cart/delete/:productId",authMiddleware, deleteCartItem)




export default cartRouter