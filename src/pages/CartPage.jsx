// import React, { useEffect, useState,useContext } from 'react'
// import Axioscall from '../services/Axioscall'
// import { getCartlistApi, updateQuantityApi } from '../services/BaseUrl'
// import { show_toast } from '../utils/Toast'
// import { ContextData } from '../services/Context' 

// const CartPage = () => {
//   useEffect(() => {
//       window.scrollTo(0,0)
   
    
//     }, [])
//   const [product, setProduct] = useState([])

//   const { getCart } = useContext(ContextData);
//   const getCartlist = async () => {
//     try {
//       const response = await Axioscall("get",getCartlistApi,"","header")
//       console.log(response);
//        setProduct(response.data.products);
//         } catch (err) {
//           console.log(err.response?.data?.message || err.message);
//         } 
//       };

//       const removeFromCart = async (productId) => {
//         try {
//           const endpoint = `/removeCartItem/${productId}`;
//           const response = await Axioscall("delete", endpoint, "", "header");
//           console.log("Product removed", response.data);
//           show_toast( "Product removed successfully", true);

//           setProduct((prevProducts) =>
//             prevProducts.filter((item) => item.productId !== productId)
//           );
//           getCart()
//                     getCartlist();
//         } catch (err) {
//           show_toast(err.response?.data?.message || err.message);
//         }
//       };
//       const updateCartItemQuantity = async (cartId, quantity) => {
//         try {
//           const endpoint = `${updateQuantityApi}/${cartId}`;
//           const response = await Axioscall("put",endpoint,{ quantity },"header");
//           console.log("Quantity updated", response.data);
//           getCartlist()
//           show_toast("Quantity Upadated successfully",true)
//         } catch (err) {
//           show_toast(err.response?.data?.message || err.message);
//         }
//       };
    
//       const handleQuantityChange = (cartId, operation) => {
//         setProduct((prevProducts) =>
//           prevProducts.map((item) => {
//             if (item.cartId === cartId) {
//               const updatedQuantity =
//                 operation === "increment" ? item.quantity + 1 : item.quantity - 1;
//                   if (updatedQuantity < 1) return item;
//                   updateCartItemQuantity(cartId, updatedQuantity);
//                   return { ...item, quantity: updatedQuantity };
//             }
//             return item;
//           })
//         );
//       };


//   useEffect(() => {
//     getCartlist();
//   }, [])
//   const [cartTotal, setCartTotal] = useState(0);

//   // Recalculate the total when product data changes
//   useEffect(() => {
//     const total = product.reduce((acc, currentProduct) => {
//       return acc + currentProduct.total; // Sum up the 'total' of each product
//     }, 0);
//     setCartTotal(total);
//   }, [product]); // Recalculate whenever 'product' changes
import React, { useEffect, useState, useContext } from 'react';
import Axioscall from '../services/Axioscall';
import { getCartlistApi, updateQuantityApi } from '../services/BaseUrl';
import { show_toast } from '../utils/Toast';
import { ContextData } from '../services/Context';

const CartPage = () => {
  const [product, setProduct] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const { getCart } = useContext(ContextData);

  const cartKey = "cart"; // Key for localStorage  // Fetch cart data from localStorage or API
  const getCartlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, fetch cart from localStorage
      const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const updatedCart = localCart.map(product => ({
        ...product,
        quantity: product?.quantity || 1,
        total: (product?.quantity || 1) * product?.currentPrice,
      }));
      setProduct(updatedCart);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
   
console.log(product,"productproductproductproduct")

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

  // Update cart item quantity
  // const updateCartItemQuantity = async (cartId, quantity) => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     // If no token, update quantity in localStorage
  //     setProduct((prevProducts) =>
  //       prevProducts.map((item) => {
  //         if (item.cartId === cartId) {
  //           item.quantity = quantity;
  //         }
  //         return item;
  //       })
  //     );
  //     localStorage.setItem(cartKey, JSON.stringify(product));
  //     show_toast("Quantity updated successfully", true);
  //   } else {
  //     // If token exists, update quantity in API
  //     try {
  //       const endpoint = `${updateQuantityApi}/${cartId}`;
  //       await Axioscall("put", endpoint, { quantity }, "header");
  //       getCartlist();
  //       show_toast("Quantity updated successfully", true);
  //     } catch (err) {
  //       show_toast(err.response?.data?.message || err.message);
  //     }
  //   }
  // };

  // // Handle quantity changes
  // const handleQuantityChange = (cartId, operation) => {
  //   setProduct((prevProducts) =>
  //     prevProducts.map((item) => {
  //       if (item.cartId === cartId) {
  //         const updatedQuantity =
  //           operation === "increment" ? item.quantity + 1 : item.quantity - 1;
  //         if (updatedQuantity < 1) return item;
  //         updateCartItemQuantity(cartId, updatedQuantity);
  //         return { ...item, quantity: updatedQuantity };
  //       }
  //       return item;
  //     })
  //   );
  // };



  const handleQuantityChange = (id, operation) => {
    const token = localStorage.getItem("token");
  
    setProduct((prevProducts) =>
      prevProducts.map((item) => {
        // Check conditionally for cartId or _id based on the token
        const itemId = token ? item.cartId : item._id;
  
        if (itemId === id) {
          const updatedQuantity =
            operation === "increment" ? item.quantity + 1 : item.quantity - 1;
  
          // Ensure quantity does not drop below 1
          if (updatedQuantity < 1) return item;
  
          // Update the quantity
          updateCartItemQuantity(id, updatedQuantity, token);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };
  
  const updateCartItemQuantity = async (id, quantity, token) => {
    if (!token) {
      // Update quantity in localStorage
      const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const updatedCart = localCart.map((item) => {
        if (item._id === id) {
          item.quantity = quantity;
        }
        return item;
      });
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setProduct(updatedCart); // Update state
      show_toast("Quantity updated successfully", true);
      getCartlist()
      const total = product.reduce((acc, item) => acc + item.total, 0);
      setCartTotal(total);
    } else {
      // Update quantity in API
      try {
        const endpoint = `${updateQuantityApi}/${id}`; // Use cartId for API
        await Axioscall("put", endpoint, { quantity }, "header");
        getCartlist(); // Refresh the cart from the server
        show_toast("Quantity updated successfully", true);
      } catch (err) {
        show_toast(err.response?.data?.message || err.message);
      }
    }
  };
  
  // // Remove item from cart
  // const removeFromCart = async (cartId) => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     // If no token, remove item from localStorage
  //     const updatedCart = product.filter((item) => item.cartId !== cartId);
  //     setProduct(updatedCart);
  //     localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  //     show_toast("Product removed successfully", true);
  //   } else {
  //     // If token exists, remove item via API
  //     try {
  //       const endpoint = `/removeCartItem/${cartId}`;
  //       await Axioscall("delete", endpoint, "", "header");
  //       show_toast("Product removed successfully", true);
  //       getCartlist();
  //     } catch (err) {
  //       show_toast(err.response?.data?.message || err.message);
  //     }
  //   }
  // };
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      // If no token, remove item from localStorage
      const updatedCart = product.filter((item) => item._id !== id); // Use _id when no token
      setProduct(updatedCart);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      show_toast("Product removed successfully", true);
      getCartlist()
    } else {
      // If token exists, remove item via API
      try {
        const endpoint = `/removeCartItem/${id}`; // Use cartId for API request
        await Axioscall("delete", endpoint, "", "header");
        show_toast("Product removed successfully", true);
        getCartlist(); // Refresh the cart list after successful removal
      } catch (err) {
        show_toast(err.response?.data?.message || err.message);
      }
    }
  };
  // Recalculate cart total when products change
  useEffect(() => {
    const total = product.reduce((acc, item) => acc + item.total, 0);
    setCartTotal(total);
  }, [product]);

  // Fetch cart data on component mount
  useEffect(() => {
    getCartlist();
    window.scrollTo(0, 0);
  }, []);
  const token = localStorage.getItem("token");
  return (
    <>
    
  {/* breadcrumb area start */}
  <section className="breadcrumb__area include-bg pt-50 pb-25">
    <div className="container">
      <div className="row">
        
      </div>
    </div>
  </section>
  {/* breadcrumb area end */}
  {/* cart area start */}
  <section className="tp-cart-area pb-120">
    <div className="container">
      <div className="row">
        <div className="col-xl-9 col-lg-8">
          <div className="tp-cart-list mb-25 mr-30">
          <table className="table">
  <thead>
    <tr>
      <th colSpan={2} className="tp-cart-header-product">Product</th>
      <th className="tp-cart-header-price">Price</th>
      <th className="tp-cart-header-quantity">Quantity</th>
      <th className="tp-cart-header-quantity">Total Price</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {product.length > 0 ? (
      product.map((product, index) => (
        <tr key={product.cartId}>
          {/* img */}
          <td className="tp-cart-img">
            <a href="product-details.html">
              {/* <img src={`https://node.autogridnumberplate.com${product.photographs[0] || ""}`} alt={product.name} /> */}
              <img
  src={`https://node.autogridnumberplate.com${token ? product.image || "" : product.photographs?.[0] || ""}`}
  alt={product.name}
/>
            </a>
          </td>
          {/* title */}
          <td className="tp-cart-title">
            <a href="product-details.html">{token ? product?.name|| "" : product?.productName|| ""}</a>
          </td>
          {/* price */}
          <td className="tp-cart-price">
            <span>{token ? product.price || "" : product.currentPrice|| ""}
            {/* {product.price} */}
            </span>
          </td>
          {/* quantity */}
          <td className="tp-cart-quantity">
            <div className="tp-product-quantity mt-10 mb-10">
              <span
                className="tp-cart-minus"
                onClick={() =>
                  handleQuantityChange(
                    token ? product?.cartId : product?._id,
                    "decrement"
                  )
                }
                // onClick={() => handleQuantityChange(product.cartId, "decrement")}
              >
                <svg
                  width={10}
                  height={2}
                  viewBox="0 0 10 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                className="tp-cart-input"
                type="text"
                value={product?.quantity}
                readOnly
              />
              <span
                className="tp-cart-plus"
                // onClick={() => handleQuantityChange(product.cartId, "increment")}
                onClick={() =>
                  handleQuantityChange(
                    token ? product?.cartId : product?._id,
                    "increment"
                  )
                }
              >
                <svg
                  width={10}
                  height={10}
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 5H9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </td>
          <td className="tp-cart-price">
            <span>{product.total}</span>
          </td>
          {/* action */}
          <td className="tp-cart-action">
            <button
              className="tp-cart-action-btn"
              // onClick={() => removeFromCart(product.cartId)}
              onClick={() =>
                removeFromCart(localStorage.getItem("token") ? product.cartId : product._id)
              }
            >
              <svg
                width={10}
                height={10}
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z"
                  fill="currentColor"
                />
              </svg>
              <span>Remove</span>
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="tp-cart-empty">
          <div style={{ textAlign: "center" }}>
            <img
              src="/assets/img/product/vector.png" // Update this path with the public URL or base64 string
              alt="Cart is empty"
              style={{ maxWidth: "200px", marginBottom: "20px" }}
            />
            <h5 style={{fontWeight:'400'}}>Your cart is currently empty.</h5>
          </div>
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>
         
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="tp-cart-checkout-wrapper">
            <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
              <span className="tp-cart-checkout-top-title">Subtotal</span>
              <span className="tp-cart-checkout-top-price">{cartTotal}</span>
            </div>
            <div className="tp-cart-checkout-shipping">
              <h4 className="tp-cart-checkout-shipping-title">Shipping</h4>
              <div className="tp-cart-checkout-shipping-option-wrapper">
                <div className="tp-cart-checkout-shipping-option">
                  <input id="flat_rate" type="radio" name="shipping" />
                  <label htmlFor="flat_rate">Flat rate: <span>$20.00</span></label>
                </div>
                <div className="tp-cart-checkout-shipping-option">
                  <input id="local_pickup" type="radio" name="shipping" />
                  <label htmlFor="local_pickup">Local pickup: <span> $25.00</span></label>
                </div>
                <div className="tp-cart-checkout-shipping-option">
                  <input id="free_shipping" type="radio" name="shipping" />
                  <label htmlFor="free_shipping">Free shipping</label>
                </div>
              </div>
            </div>
            <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
              <span>Total</span>
              <span>{cartTotal}</span>
            </div>
            <div className="tp-cart-checkout-proceed">
              <a href="checkout.html" className="tp-cart-checkout-btn w-100">Proceed to Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


    </>
  )
}

export default CartPage
