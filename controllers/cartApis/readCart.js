import Cart from '../../models/cartModel.js'


//GET CART ITEMS
export const getCartItems = async (req, res) => {
    const userId = req.user.id
  try {
    const cart = await Cart.findOne({userId}).populate("products.productId")
    if (!cart) {
     return res.status(400).json({ message: "Cart not found" })
    }

    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
  }
}




//GET ALL CARTS
export const getAllCarts = async(req, res) => {
  try{
    const carts = await Cart.find().populate("products.productId")
    if(!carts){
      res.status(404).json({message: 'No carts available'})
    }

    res.status(200).json(carts)
  } catch(err){
    res.status(500).json({message: 'internal server error'})

  }
}