import React, { useEffect, useState } from 'react';
import Axioscall from '../../services/Axioscall';
import { userOrderApi } from '../../services/BaseUrl';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await Axioscall('get', userOrderApi, '', 'header');
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mt-20 mb-20">
      <div className="profile__ticket table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Product Title</th>
              <th scope="col">Status</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Payment Status</th>
              {/* <th scope="col">View</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <th scope="row">{order.orderId}</th>
                  <td>
                    {order.products.map((product) => (
                      <div key={product._id}>{product.productId.productName}</div>
                    ))}
                  </td>
                  <td>{order.status}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.paymentStatus}</td>
                  {/* <td>
                    <a href="#" className="tp-logout-btn">
                      Invoice
                    </a>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
