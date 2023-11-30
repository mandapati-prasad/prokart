require("dotenv").config()
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors")


const app = express();
// app.use(express.static("public"));
app.use(cors())
app.use(express.json());
const path = require("path")

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.get("/", (req, res) => {
  res.send("welcome to the prokart website")
})

const array = []

const calculateOrderAmount = (items) => {
  items.map((item) => {
    const {price, cartQuantity} = item
    const cartItemAmount = price * cartQuantity;
    return array.push(cartItemAmount);
  })
  const totalAmount = array.reduce((a,b) => {
    return a+b
  },0);
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    shipping:{
      address:{
        line1:shipping.line1,
        line2:shipping.line2,
        city:shipping.city,
        state:shipping.state,
        country:shipping.country,
        postal_code:shipping.postal_Code
      },
      name:shipping.name,
      phone:shipping.phone
    },
    // receipt_email:userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));