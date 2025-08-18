import Cart from '../../models/cartModel.js'
import Product from '../../models/productModel.js'

export const createCartItem = async (req, res) => {
    const {productId} = req.params
    const userId = req.user.id

    try{
      //check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      //check for cart existence
      let cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        cart = new Cart({
          userId: userId,
          products: [
            {
              productId: product.id,
              quantity: 1,
              price: product.price,
            },
          ],
          
        });
        await cart.save();
      } else {
        //check if product already exists in the cart
        const existingCartItem = cart.products.find((item) => item.productId.toString() === productId);
        if (existingCartItem) {
          // if Product already exists in the cart, update quantity
          existingCartItem.quantity += 1;
        } else {
          // add product if it does not exist in the cart
          cart.products.push({
            productId: product.id,
            quantity: 1,
            price: product.price,
          });
        }
      }

      //update totalItemPrice of each member of cart array
      cart.products.forEach(item => {item.totalItemPrice = item.quantity * item.price});

      //update the totalCartPrice of the cart
      cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)
      
      //save the cart both existing or newly created cart
      await cart.save()
      res.status(201).json(cart)
      
    }catch(err){
        console.log(err)
        res.status(500).json(err.message)
        
    }
}
