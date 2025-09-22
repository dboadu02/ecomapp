import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: Number,
        quantity: Number,
      }
    ],
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    total: Number,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
)


const Order = mongoose.model('Order', orderSchema)
export default Order
