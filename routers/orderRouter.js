import Router from 'express'
import {createOrder, getUserOrders, getAllOrders, updateOrderStatus} from '../controllers/orderApi/orderController.js'
import authMiddleware from '../middlewares/authmiddleware.js'
import checkAdmin from '../middlewares/checkAdminStatus.js'

const orderRouter = Router()

orderRouter
  .post('/order', authMiddleware, createOrder)
  .get('/orders/:id', authMiddleware, getUserOrders)

  //admin routes
  .get('/admin/orders', authMiddleware, checkAdmin, getAllOrders)
  .put('/admin/orders/:id', authMiddleware, checkAdmin, updateOrderStatus)

export default orderRouter