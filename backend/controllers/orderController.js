import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173"
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

    // Create a Stripe session for payment - necessary for stripe 
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
      metadata: {
        orderId: newOrder._id.toString()
      }
    });

    // Respond with the created order
    res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error);
    res.json({ success:false, message: "Failed to place order" });
  }
};

const verifyOrder = async(req,res) =>{
  const {orderId, success} = req.body;
  try {
    if(success =="true"){
      // Double check: only mark as paid if not already paid by webhook
      const order = await orderModel.findById(orderId);
      if(order && order.payment !== "true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:"true"});
      }
      res.json({success:true, message:"Paid"})
    }
    else{
      // Only delete if payment not confirmed by webhook
      const order = await orderModel.findById(orderId);
      if(order && order.payment !== "true"){
        await orderModel.findByIdAndDelete(orderId);
      }
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    res.json({success:false, message:"Error"})
  } 
}

// user orders for frontend
const userOrders = async(req,res) =>{
  const {userId} = req.body;
  try {
    const orders = await orderModel.find({userId});
    res.json({success:true, data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error fetching orders"});
  }
}

// orders from all users - admin panel ke liye
const listOrders = async(req,res) =>{
  try {
    const orders = await orderModel.find();
    res.json({success:true, data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error fetching orders"});
  }

}

// api for updating order status

const updateStatus = async(req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// stripe webhook handler - reliable payment confirmation
const handleWebhook = async(req,res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // ⚠️ IMPORTANT: Use raw body, not parsed JSON for signature verification
    // In server.js, pass raw body to this middleware:
    // app.post('/webhook', express.raw({type: 'application/json'}), handleWebhook)
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(`Webhook signature verification failed: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    // Handle the event
    switch(event.type) {
      case 'charge.succeeded':
        const charge = event.data.object;
        console.log(`✅ Payment succeeded for charge: ${charge.id}`);
        
        // Extract orderId from Stripe session
        if(charge.metadata && charge.metadata.orderId) {
          const orderId = charge.metadata.orderId;
          await orderModel.findByIdAndUpdate(
            orderId,
            {payment: "true"},
            {new: true}
          );
          console.log(`Order ${orderId} marked as paid via webhook`);
        }
        break;

      case 'charge.failed':
        console.log(`❌ Payment failed for charge: ${event.data.object.id}`);
        // You can add logic here to notify user or retry
        break;

      case 'charge.refunded':
        console.log(`💰 Refund processed for charge: ${event.data.object.id}`);
        // Optional: handle refunds
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({received: true});
  } catch (error) {
    console.log(`Webhook handler error: ${error.message}`);
    res.status(500).json({success: false, message: "Webhook processing failed"});
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, handleWebhook }