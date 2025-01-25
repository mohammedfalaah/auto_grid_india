import React, { useState } from 'react';
import axios from 'axios';

const SambleCheckout = () => {
  const [products, setProducts] = useState([
    { productId: "65a0e2b29c4a5a001f48f3b1", quantity: 2 },
    { productId: "65a0e2c79c4a5a001f48f3b2", quantity: 1 },
  ]);
  const [address, setAddress] = useState({
    name: "John Doe",
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    phone: "9876543210",
    email: "johndoe@example.com",
  });

  const [totalAmount, setTotalAmount] = useState(1500);

  const handleSubmit = async () => {
    try {
      // Format the products dynamically
      const orderData = {
        user: "65a0d6f89c4a5a001f48f3a5", 
        products: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
        totalAmount,
        address,
      };

      // Send the request
      const response = await axios.post("https://node.autogridnumberplate.com/api/createorder", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h1>Order Form</h1>
      {/* Render products dynamically (optional UI for display) */}
      {products.map((product, index) => (
        <div key={index}>
          <p>Product ID: {product.productId}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
};

export default SambleCheckout;