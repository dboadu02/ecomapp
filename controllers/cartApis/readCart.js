import Cart from '../../models/cartModel.js'


//GET CART ITEMS
export const getCartItems = async (req, res) => {
    const userId = req.user.id
  try {
    const cart = await Cart.findOne({userId}).populate("products.productId")
    if (!cart) {
      res.status(400).json({ message: "Cart not found" })
      return
    }
    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
  }
}
