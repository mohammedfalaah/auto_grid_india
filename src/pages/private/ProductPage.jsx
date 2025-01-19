import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { show_toast } from "../../utils/Toast";
import Axioscall from "../../services/Axioscall";
import {
  addToCartApi,
  addToWishlistApi,
  getCategoryApi,
  productApi,
} from "../../services/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { ProductsPath, ProfilePath, WishlistPath } from "../../utils/Constants";
import { ContextData } from "../../services/Context";

const ProductPage = () => {
 
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getFavouriteContext,categories ,products,handleCategoryClick,totalProducts,loading } = useContext(ContextData);
  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };
  const [pagination, setPagination] = useState({
    isNext: false,
    isPrev: false,
  });
  const [pages, setPages] = useState({
    page: 1,
    limit: 15,
  });
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  

  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // Check for token
  
      if (!token) {
        // If no token, store wishlist data in localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!wishlist.includes(productId)) {
          wishlist.push(productId);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          show_toast("Product added to wishlist", true);
        } else {
          show_toast("Product is already in your wishlist", false);
        }
        return;
      }
  
      // If token exists, proceed with API call
      let body = { productId: productId };
      const response = await Axioscall("post", addToWishlistApi, body, "header");
      getFavouriteContext();
      if (response.data.success) {
        show_toast(response.data.message, true);
      } else {
        show_toast("Failed to add item to wishlist!", false);
      }
    } catch (error) {
      show_toast("An error occurred while adding to wishlist", false);
    }
  };
  

  // const handleAddToCart = async (productId, quantity = 1) => {
  //   try {
  //     let body = {
  //       userId: userId,
  //       productId: productId,
  //       quantity: quantity,
  //     };

  //     const response = await Axioscall("post", addToCartApi, body, "header");

  //     if (response?.status === 200) {
  //       show_toast("Product added to cart successfully", true);
  //     } else {
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     show_toast(error?.response?.data?.message, false);
  //   }
  // };

const handleAddToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token"); // Check for token
    const cartKey = "cart";

    // Reusable function to handle localStorage cart
    const updateLocalStorageCart = (productId) => {
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        show_toast("Product added to Cart", true);
      } else {
        show_toast("Product is already in your Cart", false);
      }
    };

    // Check if token exists; if not, use localStorage
    if (!token) {
      updateLocalStorageCart(productId);
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

  




  return (
    <>
      <div>
        <div className="body-overlay" />
        {/* offcanvas area end */}
        {/* mobile menu area start */}

        {/* header area end */}
        {/* filter offcanvas area start */}
        <div className="tp-filter-offcanvas-area">
          <div className="tp-filter-offcanvas-wrapper">
            <div className="tp-filter-offcanvas-close">
              <button
                type="button"
                className="tp-filter-offcanvas-close-btn filter-close-btn"
              >
                <i className="fa-solid fa-xmark" />
                Close
              </button>
            </div>
            <div className="tp-shop-sidebar">
              <div className="tp-shop-widget mb-50">
                <h3 className="tp-shop-widget-title">Categories</h3>
                <div className="tp-shop-widget-content">
                  <div className="tp-shop-widget-categories">
                    <ul>
                      {categories.map((categoryItem) => (
                        <li key={categoryItem._id}>
                          <strong>{categoryItem.category}</strong>
                          <ul>
                            {categoryItem.subcategories.map(
                              (subcategory, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    handleCategoryClick(subcategory)
                                  }
                                >
                                  <a href="#">{subcategory}</a>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* color */}

              {/* product rating */}

              {/* brand */}
            </div>
          </div>
        </div>
        {/* filter offcanvas area end */}
        <main>
          {/* breadcrumb area start */}
          <section className="breadcrumb__area include-bg pt-25 pb-25">
            <div className="container">
              <div className="row">
                <div className="col-xxl-12">
                  <div className="breadcrumb__content p-relative z-index-1">
                    <h3 className="breadcrumb__title">Shop </h3>
                    <div className="breadcrumb__list">
                      <span>
                        <a>Home</a>
                      </span>
                      <span>Shop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* breadcrumb area end */}
          {/* shop area start */}
          <section className="tp-shop-area pb-120 ">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4">
                  <div className="tp-shop-sidebar mr-10">
                    {/* filter */}

                    {/* status */}
                    <div>
      {/* Filter Button for Mobile */}
      {/* <button
        className="filter-button"
        onClick={() => setShowCategories(!showCategories)}
      >
        {showCategories ? "Hide Filters" : "Show Filters"}
      </button> */}
       <button style={{backgroundColor:'black',float:'right'}} type="button" onClick={() => setShowCategories(!showCategories)} className=" filter-button ">
  <span>
    <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9998 3.45001H10.7998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.8 3.45001H1" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5999 5.9C7.953 5.9 9.0499 4.8031 9.0499 3.45C9.0499 2.0969 7.953 1 6.5999 1C5.2468 1 4.1499 2.0969 4.1499 3.45C4.1499 4.8031 5.2468 5.9 6.5999 5.9Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.0002 11.15H12.2002" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.2 11.15H1" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.4002 13.6C10.7533 13.6 11.8502 12.5031 11.8502 11.15C11.8502 9.79691 10.7533 8.70001 9.4002 8.70001C8.0471 8.70001 6.9502 9.79691 6.9502 11.15C6.9502 12.5031 8.0471 13.6 9.4002 13.6Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
  Filter
</button>


      {/* Categories Section */}
      <div
        className={`tp-shop-widget mb-50 ${showCategories ? "show" : "hide"}`}
      >
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>
              {categories.map((categoryItem) => (
                <li key={categoryItem._id}>
                  <strong>{categoryItem.category}</strong>
                  <ul>
                    {categoryItem.subcategories.map((subcategory, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(subcategory)}
                      >
                        <a>{subcategory}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

                    {/* categories */}
                  

                    {/* color */}

                    {/* product rating */}

                    {/* brand */}
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                  <div className="tp-shop-main-wrapper">
                    <div className="tp-shop-top mb-45">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="tp-shop-top-left d-flex align-items-center ">
                            <div className="tp-shop-top-result">
                              <p>{totalProducts} results</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tp-shop-items-wrapper tp-shop-item-primary">
                      <div className="tab-content" id="productTabContent">
                        <div
                          role="tabpanel"
                          aria-labelledby="grid-tab"
                          tabIndex={0}
                        >
                          <div className="row">
                            {loading ? (
                              <div className="col-12 text-center">
                                <div className="loading-circle">
                                  <div
                                    className="spinner-border text-danger"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                </div>
                              </div>
                          ) : products.length === 0 ? (
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                            <p className="text-center text-muted" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                              No data here
                            </p>
                          </div>
                          
                          ) : (
                              products.map((product, index) => (
                                <div className="col-xl-3 col-md-6 col-sm-6">
                                  <div className="tp-product-item-2 mb-40">
                                    <div className="tp-product-thumb-2 p-relative z-index-1 fix w-img">
                                      <a
                                        onClick={() => handleQuickView(product)}
                                      >
                                        <img
                                          className="product-img"
                                          src={`https://node.autogridnumberplate.com${
                                            product.photographs?.[0] || ""
                                          }`}
                                          alt={product.productName}
                                        />{" "}
                                      </a>
                                      {/* product action */}
                                      <div className="tp-product-action-2 tp-product-action-blackStyle">
                                        <div className="tp-product-action-item-2 d-flex flex-column">
                                          <button
                                            type="button"
                                            className="tp-product-action-btn-2 tp-product-add-cart-btn"
                                            onClick={() =>
                                              handleAddToCart(product)
                                            }
                                          >
                                            <svg
                                              width={17}
                                              height={17}
                                              viewBox="0 0 17 17"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.34706 4.53799L3.85961 10.6239C3.89701 11.0923 4.28036 11.4436 4.74871 11.4436H4.75212H14.0265H14.0282C14.4711 11.4436 14.8493 11.1144 14.9122 10.6774L15.7197 5.11162C15.7384 4.97924 15.7053 4.84687 15.6245 4.73995C15.5446 4.63218 15.4273 4.5626 15.2947 4.54393C15.1171 4.55072 7.74498 4.54054 3.34706 4.53799ZM4.74722 12.7162C3.62777 12.7162 2.68001 11.8438 2.58906 10.728L1.81046 1.4837L0.529505 1.26308C0.181854 1.20198 -0.0501969 0.873587 0.00930333 0.526523C0.0705036 0.17946 0.406255 -0.0462578 0.746256 0.00805037L2.51426 0.313534C2.79901 0.363599 3.01576 0.5995 3.04042 0.888012L3.24017 3.26484C15.3748 3.26993 15.4139 3.27587 15.4726 3.28266C15.946 3.3514 16.3625 3.59833 16.6464 3.97849C16.9303 4.35779 17.0493 4.82535 16.9813 5.29376L16.1747 10.8586C16.0225 11.9177 15.1011 12.7162 14.0301 12.7162H14.0259H4.75402H4.74722Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                            <span className="tp-product-tooltip tp-product-tooltip-right">
                                              Add to Cart
                                            </span>
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleQuickView(product)
                                            }
                                            type="button"
                                            className="tp-product-action-btn-2 tp-product-quick-view-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#producQuickViewModal"
                                          >
                                            <svg
                                              width={18}
                                              height={15}
                                              viewBox="0 0 18 15"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.99948 5.06828C7.80247 5.06828 6.82956 6.04044 6.82956 7.23542C6.82956 8.42951 7.80247 9.40077 8.99948 9.40077C10.1965 9.40077 11.1703 8.42951 11.1703 7.23542C11.1703 6.04044 10.1965 5.06828 8.99948 5.06828ZM8.99942 10.7482C7.0581 10.7482 5.47949 9.17221 5.47949 7.23508C5.47949 5.29705 7.0581 3.72021 8.99942 3.72021C10.9407 3.72021 12.5202 5.29705 12.5202 7.23508C12.5202 9.17221 10.9407 10.7482 8.99942 10.7482Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.41273 7.2346C3.08674 10.9265 5.90646 13.1215 8.99978 13.1224C12.0931 13.1215 14.9128 10.9265 16.5868 7.2346C14.9128 3.54363 12.0931 1.34863 8.99978 1.34773C5.90736 1.34863 3.08674 3.54363 1.41273 7.2346ZM9.00164 14.4703H8.99804H8.99714C5.27471 14.4676 1.93209 11.8629 0.0546754 7.50073C-0.0182251 7.33091 -0.0182251 7.13864 0.0546754 6.96883C1.93209 2.60759 5.27561 0.00288103 8.99714 0.000185582C8.99894 -0.000712902 8.99894 -0.000712902 8.99984 0.000185582C9.00164 -0.000712902 9.00164 -0.000712902 9.00254 0.000185582C12.725 0.00288103 16.0676 2.60759 17.945 6.96883C18.0188 7.13864 18.0188 7.33091 17.945 7.50073C16.0685 11.8629 12.725 14.4676 9.00254 14.4703H9.00164Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                            <span className="tp-product-tooltip tp-product-tooltip-right">
                                              Quick View
                                            </span>
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleAddToWishlist(product._id)
                                            }
                                            type="button"
                                            className="tp-product-action-btn-2 tp-product-add-to-wishlist-btn"
                                          >
                                            <svg
                                              width={18}
                                              height={18}
                                              viewBox="0 0 18 18"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.60355 7.98635C2.83622 11.8048 7.7062 14.8923 9.0004 15.6565C10.299 14.8844 15.2042 11.7628 16.3973 7.98985C17.1806 5.55102 16.4535 2.46177 13.5644 1.53473C12.1647 1.08741 10.532 1.35966 9.40484 2.22804C9.16921 2.40837 8.84214 2.41187 8.60476 2.23329C7.41078 1.33952 5.85105 1.07778 4.42936 1.53473C1.54465 2.4609 0.820172 5.55014 1.60355 7.98635ZM9.00138 17.0711C8.89236 17.0711 8.78421 17.0448 8.68574 16.9914C8.41055 16.8417 1.92808 13.2841 0.348132 8.3872C0.347252 8.3872 0.347252 8.38633 0.347252 8.38633C-0.644504 5.30321 0.459792 1.42874 4.02502 0.284605C5.69904 -0.254635 7.52342 -0.0174044 8.99874 0.909632C10.4283 0.00973263 12.3275 -0.238878 13.9681 0.284605C17.5368 1.43049 18.6446 5.30408 17.6538 8.38633C16.1248 13.2272 9.59485 16.8382 9.3179 16.9896C9.21943 17.0439 9.1104 17.0711 9.00138 17.0711Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M14.203 6.67473C13.8627 6.67473 13.5743 6.41474 13.5462 6.07159C13.4882 5.35202 13.0046 4.7445 12.3162 4.52302C11.9689 4.41097 11.779 4.04068 11.8906 3.69666C12.0041 3.35175 12.3724 3.16442 12.7206 3.27297C13.919 3.65901 14.7586 4.71561 14.8615 5.96479C14.8905 6.32632 14.6206 6.64322 14.2575 6.6721C14.239 6.67385 14.2214 6.67473 14.203 6.67473Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                            <span className="tp-product-tooltip tp-product-tooltip-right">
                                              Add To Wishlist
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="tp-product-content-2 pt-15">
                                      {/* <div className="tp-product-tag-2">
                              <a href="#">Whitetails Store</a>
                            </div> */}
                                      <h3 className="tp-product-title-2">
                                        <a>{product.productName}</a>
                                      </h3>

                                      <div className="tp-product-price-wrapper-2">
                                        <span
                                          style={{ paddingRight: "10px" }}
                                          className="tp-product-price-2 new-price"
                                        >
                                          ₹{product?.currentPrice ?? ""}
                                        </span>
                                        <span className="tp-product-price-2 old-price">
                                          ₹{product?.originalPrice}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4" style={{ textAlign: "right" }}>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li
                            className={`page-item ${
                              !pagination.isPrev ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={(e) => {
                                e.preventDefault();
                                if (pagination.isPrev) {
                                  setPages((prev) => ({
                                    ...prev,
                                    page: prev.page - 1,
                                  }));
                                }
                              }}
                            >
                              Prev
                            </button>
                          </li>
                          <li
                            className={`page-item ${
                              !pagination.isNext ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={(e) => {
                                e.preventDefault();
                                if (pagination.isNext) {
                                  setPages((prev) => ({
                                    ...prev,
                                    page: prev.page + 1,
                                  }));
                                }
                              }}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* shop area end */}
          <div
            className="modal fade tp-product-modal"
            id="producQuickViewModal"
            tabIndex={-1}
            aria-labelledby="producQuickViewModal"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {selectedProduct ? (
                  <>
                    <div className="tp-product-modal-content d-lg-flex align-items-start">
                      <button
                        type="button"
                        className="tp-product-modal-close-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#producQuickViewModal"
                      >
                        <i className="fa-regular fa-xmark" />
                      </button>
                      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
                        <nav>
                          <div
                            className="nav nav-tabs flex-sm-column"
                            id="productDetailsNavThumb"
                            role="tablist"
                          >
                            {selectedProduct.photographs.map((photo, index) => (
                              <button
                                key={index}
                                className={`nav-link ${
                                  index === 0 ? "active" : ""
                                }`}
                                id={`nav-${index + 1}-tab`}
                                data-bs-toggle="tab"
                                data-bs-target={`#nav-${index + 1}`}
                                type="button"
                                role="tab"
                                aria-controls={`nav-${index + 1}`}
                                aria-selected={index === 0}
                              >
                                <img
                                  src={`https://node.autogridnumberplate.com${photo}`}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="img-fluid"
                                />
                              </button>
                            ))}
                          </div>
                        </nav>
                        <div
                          className="tab-content m-img"
                          id="productDetailsNavContent"
                          style={{ width: "25rem" }}
                        >
                          {selectedProduct.photographs.map((photo, index) => (
                            <div
                              key={index}
                              className={`tab-pane fade ${
                                index === 0 ? "show active" : ""
                              }`}
                              id={`nav-${index + 1}`}
                              role="tabpanel"
                              aria-labelledby={`nav-${index + 1}-tab`}
                              tabIndex={0}
                            >
                              <div className="tp-product-details-nav-main-thumb">
                                <img
                                  src={`https://node.autogridnumberplate.com${photo}`}
                                  alt={`Main View ${index + 1}`}
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="tp-product-details-wrapper">
                        <div className="tp-product-details-category">
                          <span>{selectedProduct.category}</span>
                        </div>
                        <h3 className="tp-product-details-title">
                          {selectedProduct.productName}
                        </h3>
                        {/* inventory details */}

                        <p>{selectedProduct.specifications}</p>
                        {/* price */}
                        <div className="tp-product-details-price-wrapper mb-20">
                          <span className="tp-product-details-price old-price">
                            ₹{selectedProduct.originalPrice}
                          </span>
                          <span className="tp-product-details-price new-price">
                            ₹{selectedProduct.currentPrice}
                          </span>
                        </div>

                        {/* actions */}
                        <div className="tp-product-details-action-wrapper">
                      
                          <div className="tp-product-details-action-item-wrapper d-flex align-items-center">
                            <div className="tp-product-details-quantity">
                              <div className="tp-product-quantity mb-15 mr-15">
                             
                              </div>
                            </div>
                            <div className="tp-product-details-add-to-cart mb-15 w-100">
                              <button  onClick={() =>
                                              handleAddToCart(selectedProduct._id)
                                            } className="tp-product-details-add-to-cart-btn w-100">
                                Add to Cart
                              </button>
                              <button   onClick={() =>
                                              handleAddToWishlist(selectedProduct._id)
                                            } className="mt-10 tp-product-details-add-to-cart-btn w-100">
                                Add to Wishlist
                              </button>
                            </div>
                          </div>
                         
                        </div>
                      
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductPage;
