import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AboutUsPath,
  BasePath,
  CartPath,
  ContactPath,
  PrivacyPolicyPath,
  ProductsPath,
  ProfilePath,
  RefundAndCancellationPath,
  ShippingPath,
  TermsAndConditionsPath,
  WishlistPath,
} from "../utils/Constants";
import { ContextData } from "../services/Context";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SearchBar } from "../components/SearchBar";

const Footer = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuVisibleSub, setIsMenuVisibleSub] = useState(false);
  const { length, categories, handleCategoryClick } = useContext(ContextData);
  const [visibleItems, setVisibleItems] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const toggleMenu = () => {

    setIsMenuVisible(!isMenuVisible);
  };

  const offcanvasRef = useRef(null);
  const toggleMenuSub = (index) => {
    toggleItem(index);
    setIsMenuVisibleSub(!isMenuVisibleSub);
  };
  const toggleItem = (index) => {
    setVisibleItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility for the specific item
    }));
  };
  const handleClick = (index) => {
    toggleMenuSub(); // Toggle main menu visibility
    toggleItem(index); // Toggle visibility of the specific submenu item
  };
  const handleclick = (subcategory) => {
    // Call your custom logic
    handleCategoryClick(subcategory);

    // Navigate to another page
    navigate(`/products`, {
      state: { subcategory },
    });

 
  };

 

  const toggleSubcategories = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (query) => {
    console.log('Selected product:', query);
  };

  return (
    <>
      <div>
        {/* offcanvas area start */}
        <div
          className="offcanvas__area offcanvas__radius bg-black"
          ref={offcanvasRef}
        >
          <div className="offcanvas__wrapper">
            <div className="offcanvas__close">
              <button className="offcanvas__close-btn offcanvas-close-btn">
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="offcanvas__content ">
              <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo logo">
                  <Link to={BasePath}>
                    <img
                      style={{ width: "100px", height: "25px" }}
                      src="/assets/img/logo/AGI copy.png "
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* <h1 className="text-3xl font-bold text-gray-900">Product Search</h1> */}
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search products..."
            category={selectedCategory}
            onClick={() => {
              handleclick();
              document
                .querySelectorAll(".offcanvas__area")
                .forEach((offcanvasArea) =>
                  offcanvasArea.classList.remove("offcanvas-opened")
                );
          
              document
                .querySelectorAll(".body-overlay")
                .forEach((bodyOverlay) =>
                  bodyOverlay.classList.remove("opened")
                );
            }}
            
          />
        </div>
      </div>
    </div>
              <div style={{ paddingBottom: "40px" }}>
                <button
                  onClick={toggleMenu}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-bars" />
                  All Categories
                </button>
                <div>
                  <nav>
                   
                    <ul
                      ref={menuRef}
                      style={{ listStyleType: "none", padding: "0" }}
                    >
                      {categories?.map((categoryItem) => (
                        <li
                          key={categoryItem._id}
                          style={{ marginBottom: "10px" }}
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              toggleSubcategories(categoryItem._id)
                            }
                          >
                            <strong>{categoryItem.category}</strong>
                            <i
                              className={`fa-solid ${
                                expandedCategory === categoryItem._id
                                  ? "fa-chevron-down"
                                  : "fa-chevron-right"
                              }`}
                              style={{ marginLeft: "8px" }}
                            ></i>
                          </a>
                          {/* Show subcategories only if the category is expanded */}
                          {expandedCategory === categoryItem._id && (
                            <ul
                              style={{
                                paddingLeft: "20px",
                                listStyleType: "none",
                                padding: "0",
                              }}
                            >
                              {categoryItem?.subcategories?.map(
                                (subcategory, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                      marginBottom: "5px",
                                      marginLeft: "10px",
                                    }}
                                    onClick={() => {
                                      handleclick(subcategory);

                                   
                                      document
                                        .querySelectorAll(".offcanvas__area")
                                        .forEach((offcanvasArea) =>
                                          offcanvasArea.classList.remove(
                                            "offcanvas-opened"
                                          )
                                        );

                                      document
                                        .querySelectorAll(".body-overlay")
                                        .forEach((bodyOverlay) =>
                                          bodyOverlay.classList.remove("opened")
                                        );
                                    }}
                                  >
                                    {subcategory}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div style={{ marginTop: '20px' }}>
  <div style={{ display: 'flex', gap: '35px', marginTop: '10px', justifyContent:'center' }}>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}></i>
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}></i>
    </a>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin-in" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}></i>
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}></i>
    </a>
  </div>
</div>

                </div>

              </div>

            

              <div className="tp-main-menu-mobile fix d-lg-none mb-40" />
              <div className="offcanvas__contact align-items-center d-none">
                <div className="offcanvas__contact-icon mr-20">
                  <span>
                    <img src="assets/img/icon/contact.png" alt />
                  </span>
                </div>
                <div className="offcanvas__contact-content">
                  <h3 className="offcanvas__contact-title">
                    <a href="tel:098-852-987">004524865</a>
                  </h3>
                </div>
              </div>
              <div className="offcanvas__btn">
                <a href="contact.html" className="tp-btn-2 tp-btn-border-2">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="offcanvas__bottom">
              <div className="offcanvas__footer d-flex align-items-center justify-content-between">
                <div className="offcanvas__currency-wrapper currency"></div>
                <div className="offcanvas__select language">
                  <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                    <div className="offcanvas__lang-img mr-15"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="body-overlay" />
      </div>
      <div
        style={{ backgroundColor: "black" }}
        id="tp-bottom-menu-sticky"
        className="tp-mobile-menu d-lg-none"
      >
        <div className="container">
          <div className="row row-cols-4">
          <div className="col">
              <div className="tp-mobile-item text-center">
                <Link
                  to={BasePath}
                  style={{ color: "white" }}
                  className="tp-mobile-item-btn"
                >
<i class="fa-solid fa-house"></i>  
                <span>Home</span>
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link
                  to={ProductsPath}
                  style={{ color: "white" }}
                  className="tp-mobile-item-btn"
                >
                  <i className="flaticon-store" />
                  <span>Store</span>
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link
                  to={WishlistPath}
                  style={{ color: "white" }}
                  className="tp-mobile-item-btn"
                >
                  <i className="flaticon-love" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link
                  to={ProfilePath}
                  style={{ color: "white" }}
                  className="tp-mobile-item-btn"
                >
                  <i className="flaticon-user" />
                  <span>Account</span>
                </Link>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <footer>
        <div style={{ backgroundColor: "black" }} className="tp-footer-area">
          <div className="tp-footer-top pt-95 pb-40">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-1 mb-50">
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-logo">
                        <a>
                          <img
                            style={{ width: "100px", height: "25px" }}
                            src="/assets/img/logo/AGI copy.png "
                            alt="logo"
                          />
                        </a>
                      </div>
                      <p style={{ color: "white" }} className="tp-footer-desc">
                        <strong>
                          Autogrid Number Plates, we specialize in delivering
                          premium-quality number plates
                        </strong>{" "}
                        designed for style, durability, and precision. Since
                        2022.{" "}
                      </p>
                      <div className="tp-footer-social">
                        <a
                          style={{ marginRight: "5px" }}
                          href="https://www.facebook.com/share/19fc7Tjb6E/?mibextid=wwXIfr"
                        >
                          <i className="fa-brands fa-facebook-f" />
                        </a>
                        <a
                          style={{ marginRight: "5px" }}
                          href="https://www.instagram.com/autogridindia?igsh=MWRhZTUxbG1peDVobQ=="
                        >
                          <i className="fa-brands fa-instagram" />
                        </a>
                        <a href="https://wa.me/919961123654">
                          <i className="fa-brands fa-whatsapp" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-2 mb-50">
                    <h4
                      style={{ color: "white" }}
                      className="tp-footer-widget-title"
                    >
                      My Account
                    </h4>
                    <div className="tp-footer-widget-content">
                      <ul>
                        <li>
                          <Link to={ShippingPath} style={{ color: "white" }}>
                            Shipping
                          </Link>
                        </li>
                        <li>
                          <Link to={WishlistPath} style={{ color: "white" }}>
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link to={ProfilePath} style={{ color: "white" }}>
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link to={CartPath} style={{ color: "white" }}>
                            Order{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-3 mb-50">
                    <h4
                      style={{ color: "white" }}
                      className="tp-footer-widget-title"
                    >
                      Infomation
                    </h4>
                    <div className="tp-footer-widget-content">
                      <ul>
                        <li>
                          <Link to={AboutUsPath} style={{ color: "white" }}>
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={PrivacyPolicyPath}
                            style={{ color: "white" }}
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={TermsAndConditionsPath}
                            style={{ color: "white" }}
                          >
                            Terms &amp; Conditions
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={RefundAndCancellationPath}
                            style={{ color: "white" }}
                          >
                            Refund And Cancellation{" "}
                          </Link>
                        </li>

                        <li>
                          <Link to={ContactPath} style={{ color: "white" }}>
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-3 mb-50">
                    <h4
                      style={{ color: "white" }}
                      className="tp-footer-widget-title"
                    >
                      Our Address
                    </h4>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-talk mb-20">
                        <span style={{ color: "white" }}>
                          Paravath Building <br />
                          Mylappuram Malappuram <br />
                          PO Downhill <br />
                          676519
                        </span>
                      </div>
                      <div className="tp-footer-contact">
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <svg
                                width={18}
                                height={16}
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6H5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1 11.4004H5.8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1 8.19922H3.4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-4 mb-50">
                    <h4
                      style={{ color: "white" }}
                      className="tp-footer-widget-title"
                    >
                      Talk To Us
                    </h4>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-talk mb-20">
                        <span style={{ color: "white" }}>
                          Got Questions? Call us
                        </span>
                        <h4>
                          <a
                            href="tel:+91 9961123654"
                            style={{ color: "white" }}
                          >
                            +91 99 611 23 654
                          </a>
                        </h4>
                        <h4>
                          <a
                            href="tel:+91 9961123654"
                            style={{ color: "white", marginTop: "10px" }}
                          >
                            +91 73 567 07 711
                          </a>
                        </h4>
                      </div>
                      <div className="tp-footer-contact">
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <svg
                                width={18}
                                height={16}
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6H5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1 11.4004H5.8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1 8.19922H3.4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-footer-bottom">
            <div className="container">
              <div className="tp-footer-bottom-wrapper">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="tp-footer-copyright">
                      <p>
                        © 2025 All Rights Reserved | Created by{" "}
                        <a href="autogridnumberplate.com">
                          autogridnumberplate.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-footer-payment text-md-end">
                      <p>
                        <img src="/assets/img/footer/footer-pay.png" alt />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* footer area end */}
      <Helmet>
        <script type="module" src="/src/main.jsx"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
        <script
          data-cfasync="false"
          src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        ></script>
        <script src="/assets/js/vendor/jquery.js"></script>
        <script src="/assets/js/vendor/waypoints.js"></script>
        <script src="/assets/js/bootstrap-bundle.js"></script>
        <script src="/assets/js/meanmenu.js"></script>
        <script src="/assets/js/swiper-bundle.js"></script>
        <script src="/assets/js/slick.js"></script>
        <script src="/assets/js/range-slider.js"></script>
        <script src="/assets/js/magnific-popup.js"></script>
        <script src="/assets/js/nice-select.js"></script>
        <script src="/assets/js/purecounter.js"></script>
        <script src="/assets/js/countdown.js"></script>
        <script src="/assets/js/wow.js"></script>
        <script src="/assets/js/isotope-pkgd.js"></script>
        <script src="/assets/js/imagesloaded-pkgd.js"></script>
        <script src="/assets/js/ajax-form.js"></script>
        <script src="/assets/js/main.js"></script>
      </Helmet>
    </>
  );
};

export default Footer;
