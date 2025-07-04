import React, { useEffect, useState } from "react";
import { createOrderApi, getCartlistApi, razorpaiApi } from "../services/BaseUrl";
import Axioscall from "../services/Axioscall";
import { jwtDecode } from "jwt-decode";
import { show_toast } from "../utils/Toast";
import { BasePath } from "../utils/Constants";

const CheckOutPage = () => {

  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",


  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      // Allow only numbers and limit to 10 digits
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "postalCode",
      "phone",
      "email",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        show_toast(`Please fill out the ${field} field.`, false);
        return false;
      }
    }

    // Ensure phone number is exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      show_toast("Phone number must be exactly 10 digits.", false);
      return false;
    }

    return true;
  };


  const cartKey = "cart";

  // const validateForm = () => {
  //   const requiredFields = [
  //     "firstName",
  //     "lastName",
  //     "street",
  //     "city",
  //     "postalCode",
  //     "phone",
  //     "email",

  //   ];
  //   for (let field of requiredFields) {
  //     if (!formData[field]) {
  //       show_toast(`Please fill out the ${field} field.`,false);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const createOrder = async () => {
    if (!validateForm()) return;

    let DecodeToken;
    if (token) {
      DecodeToken = jwtDecode(localStorage.getItem("token"));
    }

    let productsFromCart = [];
    if (!token) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      productsFromCart = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        vehicleNumber: item?.vehicleNumber,
        vehicleModel: item?.vehicleModel,
      }));
    }

    // Calculate total amount
    const totalAmount = product.reduce(
      (sum, item) =>
        sum + (token ? item.price * item.quantity : item.currentPrice * item.quantity),
      0
    );

    const orderPayload = {
      products: token
        ? product?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          vehicleNumber: item?.vehicleNumber,
          vehicleModel: item?.vehicleModel,

        }))
        : productsFromCart,
      address: {
        name: formData?.firstName + " " + formData?.lastName,
        street: formData?.street,
        city: formData?.city,
        state: formData?.country,
        postalCode: formData?.postalCode,
        phone: formData?.phone,
        email: formData?.email,
        company: formData?.company,
      },

      totalAmount,
      ...(token && { user: DecodeToken?.id }),
    };

    try {
      const response = await Axioscall("post", createOrderApi, orderPayload, "header");
      

      const paymentOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "AUTO GRID INDIA ",
        description: "Order Payment",
        order_id: response.data.order.orderId, // Order ID from your server
        handler: async (paymentResult) => {
          console.log("paymentResult:", paymentResult);
          try {
            const verifyResponse = await Axioscall(
              "post",
              razorpaiApi,
              {
                razorpayPaymentId: paymentResult.razorpay_payment_id,
                orderId: paymentResult.razorpay_order_id,
                razorpaySignature: paymentResult.razorpay_signature,

              },
              "header"
            );
            localStorage.removeItem("cart");

            show_toast("Payment successful! Your order has been placed.", true);
            // window.location.href = BasePath;

          } catch (error) {
            console.error("Payment Verification Failed:", error);
            show_toast("Payment verification failed. Please contact support.", false);
          }
        },
        prefill: {
          name: formData?.firstName + " " + formData?.lastName,
          email: formData?.email,
          contact: formData?.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };



      const razorpay = new window.Razorpay(paymentOptions);

      razorpay.on("payment.failed", (error) => {
        console.error("Payment Failed:", error);
        show_toast("Payment failed. Please try again.", false);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error placing order:", error);
      show_toast("Failed to place order. Please try again.", false);
    }
  };


  const getCartlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, fetch cart from localStorage
      const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const updatedCart = localCart.map((product) => ({
        ...product,
        quantity: product?.quantity || 1,
        total: (product?.quantity || 1) * product?.currentPrice,
      }));
      setProduct(updatedCart);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    } else {
      // If token exists, fetch cart from API
      try {
        const response = await Axioscall("get", getCartlistApi, "", "header");
        setProduct(response.data.products);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    }
  };
  useEffect(() => {
    getCartlist();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <section
          className="breadcrumb__area include-bg pt-95 pb-50"
          data-bg-color="#EFF1F5"
        >
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Checkout</h3>
                  <div className="breadcrumb__list">
                    <span>
                      <a href="#">Home</a>
                    </span>
                    <span>Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="tp-checkout-area pb-120" data-bg-color="#EFF1F5">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="tp-checkout-bill-area">
                  <h3 className="tp-checkout-bill-title">Billing Details</h3>
                  <div className="tp-checkout-bill-form">
                    <form>
                      <div className="tp-checkout-bill-inner">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                First Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                Last Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Company name (optional)</label>
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Example LTD."
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Country / Region </label>
                              <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="India"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Street address</label>
                              <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                placeholder="House number and street name"
                              />
                            </div>
                            <div className="tp-checkout-input">
                              <input
                                type="text"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleInputChange}
                                placeholder="Apartment, suite, unit, etc. (optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Town / City</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Town / City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>Postcode ZIP</label>
                              <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                placeholder="Postcode ZIP"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>
                                Phone <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>
                                Email address <span>*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email address"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                {/* checkout place order */}
                <div className="tp-checkout-place white-bg">
                  <h3 className="tp-checkout-place-title">Your Order</h3>
                  <div className="tp-order-info-list">
                    <ul>
                      {/* header */}
                      <li className="tp-order-info-list-header">
                        <h4>Product</h4>
                        <h4>Total</h4>
                      </li>
                      {/* item list */}
                      {product?.length > 0 ? (
                        product?.map((item) => (
                          <li
                            key={item?.cartId}
                            className="tp-order-info-list-desc"
                          >
                            <p>
                              {item?.name || item?.productName}{" "}
                              <span> x {item?.quantity}</span>
                            </p>{" "}
                            <span>
                              {token
                                ? (item?.price * item?.quantity).toFixed(2)
                                : (item?.currentPrice * item?.quantity).toFixed(
                                  2
                                )}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="tp-order-info-list-empty">
                          <p>Your order is empty.</p>
                        </li>
                      )}

                      {/* subtotal */}
                      <li className="tp-order-info-list-subtotal">
                        <span>Subtotal</span>
                        <span>
                          ₹
                          {product
                            .reduce(
                              (acc, item) =>
                                acc +
                                (token
                                  ? item.price * item.quantity
                                  : item.currentPrice * item.quantity),
                              0
                            )
                            .toFixed(2)}
                        </span>{" "}
                      </li>

                      {/* total */}
                      <li className="tp-order-info-list-total">
                        <span>Total</span>
                        <span>
                          ₹
                          {product
                            .reduce(
                              (acc, item) =>
                                acc +
                                (token
                                  ? item.price * item.quantity
                                  : item.currentPrice * item.quantity),
                              0
                            )
                            .toFixed(2)}
                        </span>{" "}
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className="payment-method">
                    <div>
                      <img
                        src="/assets/img/logo/razorpay.webp"
                        alt="Razorpay Logo"
                        style={{ width: "120px" }}
                      />
                      <h6>Credit Card/Debit Card/NetBanking</h6>
                      <p></p>
                    </div>

                    <p>
                      Pay securely by Credit or Debit card or Internet Banking
                      through Razorpay.
                    </p>
                  </div>

                  <div className="tp-checkout-agree">
                    <div className="tp-checkout-option">
                      <input id="read_all" type="checkbox" />
                      <label style={{ fontSize: "10px" }} htmlFor="read_all">
                        {" "}
                        I have read and agree to the website Terms and
                        conditions *.
                      </label>
                    </div>
                  </div>
                  <button onClick={createOrder} className="tp-checkout-btn">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* checkout area end */}
      </main>
    </>
  );
};

export default CheckOutPage;
