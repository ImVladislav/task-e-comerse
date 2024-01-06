import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const getData = useSelector((state) => state.cartReducer.carts);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (
      !formData.email ||
      !formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.phone || !formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, proceed with order processing
      console.log("Order data:", {
        buyer: formData,
        products: [getData] /* Add your product data here */,
      });

      // Display success message
      setSuccessMessage("Your order has been placed successfully!");

      // Send an email to the provided email address
      // Add code to send an email (not possible within this environment)
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <button type="submit">Place Order</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Checkout;
