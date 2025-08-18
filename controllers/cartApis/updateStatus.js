import Cart from '../../models/cartModel.js'


export const updateStatus = async (req, res) => {
    const {id} = req.params
    const {status} = req.body

    try{
       //check if assigned status is valid
        const allowedStatus = ['pending', 'failed', 'successful']
        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ error: "Invalid payment status" })
        }

        const order = await Cart.findByIdAndUpdate(id, {orderStatus: status}, {new: true})
        if(!order){
            return res.status(400).json({message: 'order not found'})
        }

        res.json({message: "Payment status updated successfully", order})
    }catch(err){
        return res.status(500).json({message: 'internal server error'})
    }
}