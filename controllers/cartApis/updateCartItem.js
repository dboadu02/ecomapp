import Cart from '../../models/cartModel.js'


//edit cart 
export const updateCartItem = async (req, res) => {
    const {productId, type} = req.params; //type is either increase or decrease
    const userId = req.user.id
    
    try{
        //users are able to edit when cart already exists
        const cart = await Cart.findOne({userId})
        const existingCartItem = cart.products.find(
          (item) => item.productId.toString() === productId
        );
        //increasing quantity of item
        if(type === "increase"){
            existingCartItem.quantity += 1
        } 
        //quantity should not be less than 1 when decreasing it
        else if(type === "decrease" && existingCartItem.quantity > 1){
            existingCartItem.quantity -= 1

        } else {
            return res.status(400).json({message: 'quantity can not be decreased'})
        }
       
        //update total Item Price after editing quantity
        cart.products.forEach(item => {item.totalItemPrice = item.price * item.quantity})

        //update total cart price
        cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0);

        await cart.save()
        res.status(200).json(cart)
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: 'internal server error'})
        return
    }

}