import Router from 'express'
import { createCartItem, updateCartItem, getCartItems, clearCartItems, deleteCartItem, updateStatus} from '../controllers/cartApis/barrel.js'
import authMiddleware from '../middlewares/authmiddleware.js'
import checkAdmin from '../middlewares/checkAdminStatus.js'

const cartRouter = Router()

cartRouter
        .post("/cart/create/:productId", authMiddleware, createCartItem)

        .get("/cart/view", authMiddleware, getCartItems)
        
        .put("/cart/updateStatus/:id",authMiddleware, checkAdmin, updateStatus)
        .put("/cart/edit/:productId/:type",authMiddleware, updateCartItem)
        
        .delete("/cart/clear",authMiddleware, clearCartItems)
        .delete("/cart/delete/:productId",authMiddleware, deleteCartItem)




export default cartRouter
