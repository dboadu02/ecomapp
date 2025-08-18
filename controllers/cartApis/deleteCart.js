import Cart from '../../models/cartModel.js'


//delete all cart items in cart
export const clearCartItems = async (req, res) => {
    const userId = req.user.id
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();
    res.status(200).json({ message: "Cart deleted successfully" })
  } catch (error) {
    console.log(error)
  }
}

//delete a particular item
export const deleteCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }

    //check if the product exists in the cart
    const existingCartItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingCartItem) {
      res.status(400).json({ message: "Product not found in cart" });
      return
    }

    /* removing product to deleted by returing all items
    except the one to be deleted */
    const filteredCart = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.products = filteredCart;
    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    )

    await cart.save();
    res.status(200).json({ message: "Item deleted successfully", cart });
  } catch (err) {
    console.log(err.message);
  }
};