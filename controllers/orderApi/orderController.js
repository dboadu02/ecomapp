import Cart from '../../models/cartModel.js'
import Order from '../../models/orderModel.js'


export const createOrder = async (req, res) => {
    const {street, city, postalCode, country} = req.body
    const userId = req.user._id

    
    try{
        if (!street || !city || !postalCode || !country) {
            return res.status(400).json({ message: "Please fill the required fields" });
        }

        //check if user has a cart created or items exist in cart
        const cart = await Cart.findOne({userId})
        if(!cart || !cart.products.length){
            res.status(400).json({message: 'cart not found or cart is empty'})
        }

         // Create order
        const order = new Order({
            userId,
            items: cart.products.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAddress: {
                street,
                city,
                postalCode,
                country
            },
            total: cart.totalCartPrice,
            paymentStatus: 'Pending',
            orderStatus: 'Pending'
        })

        await order.save()
        await cart.deleteOne() // Clear cart after order is placed
        res.status(201).json({message: 'Order created successfully', order})

    } catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

//get user orders
export const getUserOrders = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params

    //check if user is accessing their own orders
    if(id !== userId.toString()) return res.status(403).json({message: 'Access denied'})

    try{
        const orders = await Order.find({userId}).populate('items.productId', 'name price description')
        if(!orders.length){
            return res.status(404).json({message: 'No orders found'})
        }

        res.status(200).json({message: 'User orders fetched successfully', orders})

    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}


//ORDERS - ADMIN
//get all orders (admin only)
export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate('userId', 'name email').populate('items.productId', 'name price')
        if(!orders.length){
            return res.status(404).json({message: 'No orders found'})
        }
        res.status(200).json({message: 'All orders fetched successfully', orders})
    } catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

//update order status (admin only)

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    //check if assigned status is valid
    const allowedStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid payment status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );
    if (!order) {
      return res.status(400).json({ message: "order not found" });
    }

    res.json({ message: "Payment status updated successfully", order });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

