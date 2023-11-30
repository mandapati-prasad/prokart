import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  selectCartAmount,
  selectCartItems,
  // selectCartQuantity,
} from "../../redux/slice/cartslice";
import { selectuserEmail } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutslice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing Checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  // const totalQuantity = useSelector(selectCartQuantity);
  const totalAmount = useSelector(selectCartAmount);
  const customerEmail = useSelector(selectuserEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `prokart payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to Initialize Checkout");
        toast.error("something went wrong");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
        
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      
    </>
  );
};

export default Checkout;
