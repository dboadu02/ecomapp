import mongoose from 'mongoose'
const Schema = mongoose.Schema

const cartSchemaItem = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },

  totalItemPrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [cartSchemaItem],
    totalCartPrice: {
      type: Number,
      default: 0
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending'
    }
  },{ timestamps: true });

const Cart = mongoose.model("cart", cartSchema);
export default Cart
