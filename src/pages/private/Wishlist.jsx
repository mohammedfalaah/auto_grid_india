import React, { useContext, useEffect, useState } from "react";
import Axioscall from "../../services/Axioscall";
import {
  addToCartApi,
  getWishlistApi,
  removeWishlistApi,
} from "../../services/BaseUrl";
import { show_toast } from "../../utils/Toast";
import { Link } from "react-router-dom";
import { CartPath } from "../../utils/Constants";
import { ContextData } from "../../services/Context";

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const userId = localStorage.getItem("userId");
  console.log(userId, "userIduserId");
  const token = localStorage.getItem("token");

  const [wishlist, setWishlist] = useState([]);
  console.log(wishlist, "wishlistwishlistwishlistwishlistwishlist");
  const { getFavouriteContext,getCart } = useContext(ContextData);

  const handleAddToCart = async (productId, product,quantity = 1) => {
    console.log(product, "productproductproduct");
    try {
      const token = localStorage.getItem("token"); // Check for token
      const cartKey = "cart";
  
      // Reusable function to handle localStorage cart
      const updateLocalStorageCart = (product) => {
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const productExists = cart.some((item) => item?._id === product?._id); // Check if the product is already in the cart
  
        if (!productExists) {
          cart.push(product); // Add product to cart
          localStorage.setItem(cartKey, JSON.stringify(cart));
          show_toast("Product added to Cart", true);
          getCart()
        } else {
          show_toast("Product is already in your Cart", false);
        }
      };
  
      // Check if token exists; if not, use localStorage
      if (!token) {
        updateLocalStorageCart(product); // Use `product` to update localStorage
        return;
      }
  
      // Ensure required variables are available
      if (!userId || !quantity) {
        show_toast("Missing user or quantity information", false);
        return;
      }
  
      // Prepare API call payload
      const body = {
        userId, // Ensure userId is defined in your scope
        productId,
        quantity,
      };
  
      // API call to add the product to the cart
      const response = await Axioscall("post", addToCartApi, body, "header");
  
      if (response?.status === 200) {
        show_toast("Product added to cart successfully", true);
      } else {
        show_toast(response?.data?.message || "Failed to add product to cart", false);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      show_toast(error?.response?.data?.message || "An unexpected error occurred", false);
    }
  };
  // const handleAddToCart = async (productId, quantity = 1) => {
  //   try {
  //     if (!userId) {
  //       show_toast(
  //         "You are not logged in. Please log in Then add items to the cart.",
  //         false
  //       );
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //       return;
  //     }

  //     if (!token) {
  //       show_toast(
  //         "Authentication token not found. Please log in again.",
  //         false
  //       );
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //       return;
  //     }
  //     let body = {
  //       userId: userId,
  //       productId: productId,
  //       quantity: quantity,
  //     };

  //     const response = await Axioscall("post", addToCartApi, body, "header");

  //     if (response.data.success) {
  //       show_toast(response.data.message, true);
  //       console.log("Cart Details:", response.data.cart);
  //     } else {
  //       show_toast("One more add item to cart!", true);
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     show_toast("Product is already in the cart", false);
  //   }
  // };

  const removeFavourite = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const updatedWishlist = wishlist.filter(
          (item) => item?.productId !== productId
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
        getFavouriteContext();
        show_toast("Removed this product from wishlist", true);
        return;
      }

      const response = await Axioscall(
        "delete",
        `${removeWishlistApi}/${productId}`,
        "",
        "header"
      );
      if (response?.data?.success) {
        show_toast("Removed this product", true);
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== productId)
        );
        getFavouriteContext();
        getFavourite();
      }
    } catch (error) {
      show_toast("Error removing item from wishlist", false);
    }
  };

  // const removeFavourite = async (productId) => {
  //   try {
  //     const response = await Axioscall(
  //       "delete",
  //       `${removeWishlistApi}/${productId}`,
  //       "",
  //       "header"
  //     );
  //     if (response?.data?.success) {
  //       show_toast("Removed this product", true);
  //       setWishlist((prevWishlist) =>
  //         prevWishlist.filter((item) => item._id !== productId)
  //       );
  //       getFavouriteContext();
  //       getFavourite();
  //     }
  //   } catch (error) {
  //     show_toast("Error removing item from wishlist:", false);
  //   }
  // };

  const getFavourite = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        const localWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(localWishlist);
        return;
      }

      const response = await Axioscall("get", getWishlistApi, "", "header");
      if (response.data?.success) {
        setWishlist(response?.data?.wishlistedProducts || []);
      }
    } catch (error) {
      show_toast("Error fetching wishlist", false);
    }
  };

  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <>
      <main>
        {/* breadcrumb area start */}
        <section className="breadcrumb__area include-bg pt-95 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Wishlist</h3>
                  <div className="breadcrumb__list">
                    <span>
                      <a href="#">Home</a>
                    </span>
                    <span>Wishlist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}
        {/* cart area start */}
        <section className="tp-cart-area pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-cart-list mb-45 mr-30">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2} className="tp-cart-header-product">
                          Product
                        </th>
                        <th className="tp-cart-header-price">Price</th>
                        <th className="tp-cart-header-quantity"></th>
                        <th>Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist?.length > 0 ? (
                        wishlist?.map((item, index) => (
                          <tr key={index}>
                            {/* img */}
                            <td className="tp-cart-img">
                              <a href="product-details.html">
                                <img
                                  src={`https://node.autogridnumberplate.com${
                                    token
                                      ? item.photographs?.[0] | ""
                                      : item?.product?.photographs?.[0] || ""
                                  }`}
                                  // src={`https://node.autogridnumberplate.com${
                                  //   item.photographs?.[0] || ""
                                  // }`}
                                  // alt={item.productName}
                                  alt={
                                    token
                                      ? item.productName || ""
                                      : item?.product?.productName || ""
                                  }
                                />
                              </a>
                            </td>
                            {/* title */}
                            <td className="tp-cart-title">
                              <a href="#">
                                {token
                                  ? item.productName || ""
                                  : item?.product?.productName || ""}
                              </a>
                            </td>
                            {/* price */}
                            <td className="tp-cart-price">
                              <span>
                                ₹
                                {token
                                  ? item.currentPrice || ""
                                  : item?.product?.currentPrice || ""}
                              </span>
                            </td>
                            {/* quantity */}
                            <td className="tp-cart-quantity">
                              <div className="tp-product-quantity mt-10 mb-10"></div>
                            </td>
                            <td className="tp-cart-add-to-cart">
                              <button
                                onClick={() =>
                                  handleAddToCart(
                                    token ? item._id : item?.product?._id,
                                    token ? item : item?.product
                                  )
                                }
                                type="submit"
                                className="tp-btn tp-btn-2 tp-btn-blue"
                              >
                                Add To Cart
                              </button>
                            </td>
                            {/* action */}
                            <td className="tp-cart-action">
                              <button
                                onClick={() =>
                                  removeFavourite(
                                    token
                                      ? item._id || ""
                                      : item?.product?._id || ""
                                  )
                                }
                                className="tp-cart-action-btn"
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
                          <td colSpan="5" className="tp-empty-wishlist">
                            <div
                              style={{ textAlign: "center" }}
                              className="tp-empty-content"
                            >
                              <img
                                src="/assets/img/product/vector-fav.png"
                                alt="Empty Wishlist"
                                style={{
                                  maxWidth: "200px",
                                  marginBottom: "20px",
                                }}
                              />
                              <h5 style={{ fontWeight: "400" }}>
                                {" "}
                                Your wishlist is currently empty.
                              </h5>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update">
                        <Link to={"/cart"} className="tp-cart-update-btn">
                          Go To Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* cart area end */}
      </main>
    </>
  );
};

export default Wishlist;
