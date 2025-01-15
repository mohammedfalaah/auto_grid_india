import React, { useContext, useState,useRef,useEffect  } from "react";
import { Link } from "react-router-dom";
import {
  BasePath,
  CartPath,
  ContactPath,
  ProductsPath,
  WishlistPath,
} from "../utils/Constants";
import LoginPage from "../pages/private/LoginPage";
import ProfilePage from "../pages/private/ProfilePage";
import { ContextData } from "../services/Context";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const menuRef = useRef(null); 
  const navigate = useNavigate();
  const { length, categories,handleCategoryClick } = useContext(ContextData);
  const { wishlistLength } = useContext(ContextData);
  console.log(categories, "categoriescategoriescategoriescategories");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* header area start */}
      <header>
        <div>
          {/* offcanvas area start */}
          <div className="offcanvas__area offcanvas__radius">
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
              {/* <div className="offcanvas__content">
                <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
                  <div className="offcanvas__logo logo">
                    <a href="index.html">
                      <img src="assets/img/logo/logo.svg" alt="logo" />
                    </a>
                  </div>
                </div>
                <div className="offcanvas__category pb-40">
                  <button className="tp-offcanvas-category-toggle">
                    <i className="fa-solid fa-bars" />
                    All Categories
                  </button>
                  <div className="tp-category-mobile-menu"></div>
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
              </div> */}
              <div className="offcanvas__bottom">
                <div className="offcanvas__footer d-flex align-items-center justify-content-between">
                  <div className="offcanvas__currency-wrapper currency">
                    <span
                      className="offcanvas__currency-selected-currency tp-currency-toggle"
                      id="tp-offcanvas-currency-toggle"
                    >
                      Currency : USD
                    </span>
                    <ul className="offcanvas__currency-list tp-currency-list">
                      <li>USD</li>
                      <li>ERU</li>
                      <li>BDT </li>
                      <li>INR</li>
                    </ul>
                  </div>
                  <div className="offcanvas__select language">
                    <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                      <div className="offcanvas__lang-img mr-15">
                        <img src="assets/img/icon/language-flag.png" alt />
                      </div>
                      <div className="offcanvas__lang-wrapper">
                        <span
                          className="offcanvas__lang-selected-lang tp-lang-toggle"
                          id="tp-offcanvas-lang-toggle"
                        >
                          English
                        </span>
                        <ul className="offcanvas__lang-list tp-lang-list">
                          <li>Spanish</li>
                          <li>Portugese</li>
                          <li>American</li>
                          <li>Canada</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-overlay" />
        </div>
        <div className="tp-header-area p-relative z-index-11">
          {/* header top start  */}

          {/* header main start */}
          <div className="tp-header-main tp-header-sticky bg-black">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className="logo">
                    <Link to={BasePath}>
                      <img
                        style={{ width: "100px", height: "25px"}}
                        src="/assets/img/logo/AGI copy.png "
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <ul>
                          <li className="has-mega-menu">
                            <Link style={{ color: "white" }} to={BasePath}>
                              Home
                            </Link>
                          </li>

                          <li className="has-mega-menu">
                            <Link style={{ color: "white" }} to={"/products"}>
                              Products
                            </Link>
                          </li>

                          <li>
                            <Link style={{ color: "white" }} to={ContactPath}>
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-3 col-md-8 col-6">
                  <div className="tp-header-main-right d-flex align-items-center justify-content-end">
                    <div className="tp-header-login d-none d-lg-block">
                      <Link
                        to={
                          localStorage.getItem("userName")
                            ? "/profile"
                            : "/login"
                        }
                        className="d-flex align-items-center"
                      >
                        <div className="tp-header-login-icon">
                          <span style={{ color: "white" }}>
                            <svg
                              width={17}
                              height={21}
                              viewBox="0 0 17 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="8.57894"
                                cy="5.77803"
                                r="4.77803"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.00002 17.2014C0.998732 16.8655 1.07385 16.5337 1.2197 16.2311C1.67736 15.3158 2.96798 14.8307 4.03892 14.611C4.81128 14.4462 5.59431 14.336 6.38217 14.2815C7.84084 14.1533 9.30793 14.1533 10.7666 14.2815C11.5544 14.3367 12.3374 14.4468 13.1099 14.611C14.1808 14.8307 15.4714 15.27 15.9291 16.2311C16.2224 16.8479 16.2224 17.564 15.9291 18.1808C15.4714 19.1419 14.1808 19.5812 13.1099 19.7918C12.3384 19.9634 11.5551 20.0766 10.7666 20.1304C9.57937 20.2311 8.38659 20.2494 7.19681 20.1854C6.92221 20.1854 6.65677 20.1854 6.38217 20.1304C5.59663 20.0773 4.81632 19.9641 4.04807 19.7918C2.96798 19.5812 1.68652 19.1419 1.2197 18.1808C1.0746 17.8747 0.999552 17.5401 1.00002 17.2014Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="tp-header-login-content d-none d-xl-block">
                          {localStorage.getItem("userName") ? (
                            <>
                              <span
                                style={{
                                  fontSize: "15px",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                Hello, {localStorage.getItem("userName")}
                              </span>
                            </>
                          ) : (
                            <>
                              <div>
                                <span style={{ color: "white" }}>
                                  Hello, Sign In
                                </span>
                                <h5
                                  style={{ color: "white" }}
                                  className="tp-header-login-title"
                                >
                                  Your Account
                                </h5>
                              </div>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>

                    <div className="tp-header-action d-flex align-items-center ml-50">
                      <div className="tp-header-action-item d-none d-lg-block">
                        <Link
                          to={WishlistPath}
                          className="tp-header-action-btn"
                        >
                          <svg
                            style={{ color: "white" }}
                            width={22}
                            height={20}
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="tp-header-action-badge">
                            {wishlistLength}
                          </span>
                        </Link>
                      </div>
                      <div className="tp-header-action-item">
                        <Link
                          to={CartPath}
                          type="button"
                          className="tp-header-action-btn cartmini-open-btn"
                        >
                          <svg
                            style={{ color: "white" }}
                            width={21}
                            height={22}
                            viewBox="0 0 21 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.48626 20.5H14.8341C17.9004 20.5 20.2528 19.3924 19.5847 14.9348L18.8066 8.89359C18.3947 6.66934 16.976 5.81808 15.7311 5.81808H5.55262C4.28946 5.81808 2.95308 6.73341 2.4771 8.89359L1.69907 14.9348C1.13157 18.889 3.4199 20.5 6.48626 20.5Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.34902 5.5984C6.34902 3.21232 8.28331 1.27803 10.6694 1.27803V1.27803C11.8184 1.27316 12.922 1.72619 13.7362 2.53695C14.5504 3.3477 15.0081 4.44939 15.0081 5.5984V5.5984"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.70365 10.1018H7.74942"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.5343 10.1018H13.5801"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="tp-header-action-badge">
                            {length}
                          </span>
                        </Link>
                      </div>
                      <div className="tp-header-action-item d-lg-none">
                        <button
                          type="button"
                          className="tp-header-action-btn tp-offcanvas-open-btn"
                          style={{color:'white'}}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={16}
                            viewBox="0 0 30 16"
                          >
                            <rect
                              x={10}
                              width={20}
                              height={2}
                              fill="currentColor"
                            />
                            <rect
                              x={5}
                              y={7}
                              width={25}
                              height={2}
                              fill="currentColor"
                            />
                            <rect
                              x={10}
                              y={14}
                              width={20}
                              height={2}
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* header bottom start */}
          <div
            className="tp-header-bottom tp-header-bottom-border d-none d-lg-block"
            style={{ backgroundColor: "#B2002E" }}
          >
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <button
                        style={{ backgroundColor: "#b2002e" }}
                        className="tp-category-menu-btn tp-category-menu-toggle"
                        onClick={toggleMenu}
                      >
                        <span>
                          <svg
                            width={18}
                            height={14}
                            viewBox="0 0 18 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        All Category
                      </button>
                      <nav className="tp-category-menu-content">
                        {/* <ul style={{ display: isMenuVisible ? "block" : "none" }}>
                <li>
                  <a href="shop.html">
                    <span>
                    
                    </span>
                    New Arrivals</a>
                </li>
             
              </ul> */}
                    <ul style={{ display: isMenuVisible ? "block" : "none" }}
                        ref={menuRef}>
  {categories?.map((categoryItem) => (
    <li key={categoryItem._id} className="has-dropdown">
      <a >
        <span>
          {/* Optional: SVG icon here */}
        </span>
        <strong>{categoryItem.category}</strong>
      </a>
      <ul className="tp-submenu">
        {categoryItem.subcategories.map((subcategory, index) => (
          <li key={index} 
          style={{cursor:"pointer"}}
          // onClick={() =>
            
          //   handleCategoryClick(subcategory)
          // }
          onClick={() => {
            handleCategoryClick(subcategory); // Call your custom logic
            navigate(`/products`, { state: { subcategory } }); // Navigate
          }}
          >
            <a >{subcategory}</a>
        
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div
                      className="main-menu menu-style-1 d-flex"
                      style={{ justifyContent: "center", padding: "10px" }}
                    >
                      <div>
                        <p
                          style={{
                            color: "white",
                            margin: "0px",
                            paddingRight: "5px",
                          }}
                        >
                          All India Free Delivery{" "}
                          <Link
                            style={{ textDecoration: "underline" }}
                            to={ProductsPath}
                          >
                            Order now
                          </Link>
                        </p>
                      </div>
                      <div>
                        {/* ÷             <FontAwesomeIcon icon={faTruck} style={{color:'white'}} />  */}
                        <svg
                          style={{ color: "white" }}
                          width="22"
                          height="19"
                          viewBox="0 0 22 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6364 1H1V12.8182H14.6364V1Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M14.6364 5.54545H18.2727L21 8.27273V12.8182H14.6364V5.54545Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5.0909 17.3636C6.3461 17.3636 7.36363 16.3461 7.36363 15.0909C7.36363 13.8357 6.3461 12.8182 5.0909 12.8182C3.83571 12.8182 2.81818 13.8357 2.81818 15.0909C2.81818 16.3461 3.83571 17.3636 5.0909 17.3636Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M16.9091 17.3636C18.1643 17.3636 19.1818 16.3461 19.1818 15.0909C19.1818 13.8357 18.1643 12.8182 16.9091 12.8182C15.6539 12.8182 14.6364 13.8357 14.6364 15.0909C14.6364 16.3461 15.6539 17.3636 16.9091 17.3636Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-contact d-flex align-items-center justify-content-end">
                      <div className="tp-header-contact-icon">
                        <span>
                          <svg
                            color="white"
                            width={21}
                            height={20}
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.96977 3.24859C2.26945 2.75144 3.92158 0.946726 5.09889 1.00121C5.45111 1.03137 5.76246 1.24346 6.01544 1.49057H6.01641C6.59631 2.05874 8.26011 4.203 8.35352 4.65442C8.58411 5.76158 7.26378 6.39979 7.66756 7.5157C8.69698 10.0345 10.4707 11.8081 12.9908 12.8365C14.1058 13.2412 14.7441 11.9219 15.8513 12.1515C16.3028 12.2459 18.4482 13.9086 19.0155 14.4894V14.4894C19.2616 14.7414 19.4757 15.0537 19.5049 15.4059C19.5487 16.6463 17.6319 18.3207 17.2583 18.5347C16.3767 19.1661 15.2267 19.1544 13.8246 18.5026C9.91224 16.8749 3.65985 10.7408 2.00188 6.68096C1.3675 5.2868 1.32469 4.12906 1.96977 3.24859Z"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.936 1.23685C16.4432 1.62622 19.2124 4.39253 19.6065 7.89874"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.936 4.59337C14.6129 4.92021 15.9231 6.23042 16.2499 7.90726"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="tp-header-contact-content">
                        <h5 style={{ color: "white" }}>Hotline:</h5>
                        <p>
                          <a
                            style={{ color: "white" }}
                            href="tel:+919961123654"
                          >
                            +(91) 996 1123 654
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
      {/* header area end */}
    </>
  );
};

export default Header;
