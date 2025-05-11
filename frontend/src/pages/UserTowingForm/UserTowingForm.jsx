import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import styles from "./towingforms.module.css";
import { useUserDetailStore } from "../../store/userDetail";

const stripePromise = loadStripe(
  "pk_test_51RGhSzFNC9lumuod1YciBcs8fWrnrUvUUznVMpl4FITPAzpTFLzcdBMEeXs9QMu0t63bQwEEnHsHFo6IlR1FT8uI00lTPccNmm"
);

const TowingServiceForm = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const pricePerKm = location.state?.price || 0;

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    vehicleModel: "",
    vehicleYear: "",
    pickupLocation: "",
    dropLocation: "",
    distance: "",
    payment: "",
  });

  const { createUserDetail } = useUserDetailStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDistance = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/maps/get-distance", {
        origin: formData.pickupLocation,
        destination: formData.dropLocation,
      });

      if (response.data.success) {
        const km = response.data.distance;
        const payment = (km * pricePerKm).toFixed(2);
        setFormData((prev) => ({
          ...prev,
          distance: km.toFixed(2),
          payment,
        }));
      } else {
        alert("Failed to calculate distance.");
      }
    } catch (err) {
      console.error("Distance error:", err);
      alert("Could not calculate distance.");
    }
  };

  const handlePayment = async () => {
    if (!formData.pickupLocation || !formData.dropLocation) {
      alert("Please enter pickup and drop locations first.");
      return;
    }

    await calculateDistance();

    try {
      const { success, detailId, message } = await createUserDetail({
        ...formData,
        serviceId,
        status: "Pending",
        date: new Date().toISOString(),
      });

      if (!success) {
        alert("Error: " + message);
        return;
      }

      const bookingDetails = {
        name: formData.name,
        payment: formData.payment,
        serviceId,
        detailId,
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingDetails }),
      });

      const data = await res.json();
      if (!data.id) throw new Error("Stripe session creation failed");

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error("Stripe redirect error:", error.message);
        alert("Stripe error: " + error.message);
      }
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Something went wrong with booking or payment.");
    }
  };

  return (
    <div className={styles.frame}>
      <h2 className={styles.title}>Towing Service Request</h2>
      <form className={styles.form}>
        {["name", "contactNumber", "vehicleModel", "vehicleYear", "pickupLocation", "dropLocation"].map((key) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.label}>
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </label>
            <input
              type={key.includes("Year") ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        ))}

        <div className={styles.formGroup}>
          <label className={styles.label}>Distance (km):</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Payment (Rs):</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.input}
            readOnly
          />
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className={styles.button}
        >
          Pay & Book
        </button>
      </form>
    </div>
  );
};

export default TowingServiceForm;