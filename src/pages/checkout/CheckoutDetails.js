import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import {
  ADD_BILLING_ADDRESS,
  ADD_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutslice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";

const CheckoutDetails = () => {
  const initialState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_Code: "",
    country: "",
    phone: "",
  };

  const [shippingAddress, setShippingAddress] = useState({ ...initialState });
  const [billingAddress, setBillingAddress] = useState({ ...initialState });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ADD_BILLING_ADDRESS(billingAddress));
    dispatch(ADD_SHIPPING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className={styles["checkout-summary"]}>
            <Card className={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div className={styles.content}>
            <Card className={styles.card}>
              <h3>Shipping Address</h3>
              <label htmlFor="name">Recipient Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Recipient Name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="line1">Address line1:</label>
              <input
                type="text"
                name="line1"
                id="line1"
                placeholder="Address line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="line2">Address line2:</label>
              <input
                type="text"
                name="line2"
                id="line2"
                placeholder="Address line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="postal_Code">Postal Code:</label>
              <input
                type="text"
                name="postal_Code"
                id="postal_Code"
                placeholder="Postal Code"
                value={shippingAddress.postal_Code}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label>Country:</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
                required
              />
            </Card>
            {/* Billing address */}
            <Card className={styles.card}>
              <h3>Billing Address</h3>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="line1">Address line1:</label>
              <input
                type="text"
                name="line1"
                id="line1"
                placeholder="Address line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="line2">Address line2:</label>
              <input
                type="text"
                name="line2"
                id="line2"
                placeholder="Address line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="postal_Code">Postal Code:</label>
              <input
                type="text"
                name="postal_Code"
                id="postal_Code"
                placeholder="Postal Code"
                value={billingAddress.postal_Code}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label>Country:</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
                required
              />
            </Card>
          </div>
          <div className={styles.proceed_btn}>
            <div>
              <button type="submit" className="--btn --btn-red">
                Proceed to checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
