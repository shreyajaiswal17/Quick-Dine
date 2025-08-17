import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend_url = "http://localhost:5173"
//  placing user order for frontend 
const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    // Save the order to the database
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

    // Create a Stripe session for payment
    const line_items = req.body.items.map((item)=>({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
        price_data:{
            currency: 'inr',
            product_data: {
                name: "Delivery charges",
            },
            unit_amount: 2 * 100 * 80,
        },
        quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the created order
    res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error);
    res.json({ success:false, message: "Failed to place order" });
  }
};


export { placeOrder }