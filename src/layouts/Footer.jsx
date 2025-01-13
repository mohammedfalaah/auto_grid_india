import React from 'react'
import { Link } from 'react-router-dom'
import { AboutUsPath, CartPath, ContactPath, PrivacyPolicyPath, ProductsPath, ProfilePath, RefundAndCancellationPath, TermsAndConditionsPath, WishlistPath } from '../utils/Constants'

const Footer = () => {
  return (
    <>
     <div id="tp-bottom-menu-sticky" className="tp-mobile-menu d-lg-none">
        <div className="container">
          <div className="row row-cols-5">
            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link to={ProductsPath} className="tp-mobile-item-btn">
                  <i className="flaticon-store" />
                  <span>Store</span>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <button className="tp-mobile-item-btn tp-search-open-btn">
                  <i className="flaticon-search-1" />
                  <span>Search</span>
                </button>
              </div>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link to={WishlistPath}  className="tp-mobile-item-btn">
                  <i className="flaticon-love" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <Link to={ProfilePath} className="tp-mobile-item-btn">
                  <i className="flaticon-user" />
                  <span>Account</span>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="tp-mobile-item text-center">
                <button className="tp-mobile-item-btn tp-offcanvas-open-btn">
                  <i className="flaticon-menu-1" />
                  <span>Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  <footer>
    <div style={{backgroundColor:'black'}} className="tp-footer-area">
      <div className="tp-footer-top pt-95 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
              <div className="tp-footer-widget footer-col-1 mb-50">
                <div className="tp-footer-widget-content">
                  <div className="tp-footer-logo">
                    <a >
                    <img style={{width:'100px',height:'25px'}} src="/assets/img/logo/AGI copy.png " alt="logo" />

                    </a>
                  </div>
                  <p style={{color:'white'}} className="tp-footer-desc"> 
                 <strong>Autogrid Number Plates, we specialize in delivering  premium-quality number plates </strong>  designed for style, durability, and precision. Since 2022,
                  ensuring your vehicle reflects your personality.                     </p>
                  <div className="tp-footer-social">
                    <a href="#"><i  className="fa-brands fa-facebook-f" /></a>
                    <a href="#"><i className="fa-brands fa-twitter" /></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                    <a href="#"><i className="fa-brands fa-vimeo-v" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <div className="tp-footer-widget footer-col-2 mb-50">
                <h4 style={{color:'white'}} className="tp-footer-widget-title">My Account</h4>
                <div className="tp-footer-widget-content">
                  <ul>
                    <li><a href="#" style={{color:'white'}}>Track Orders</a></li>
                    <li><a href="#" style={{color:'white'}}>Shipping</a></li>
                    <li><a href="#" style={{color:'white'}}>Wishlist</a></li>
                    <li><a href="#" style={{color:'white'}}>My Account</a></li>
                    <li><Link to={CartPath} style={{color:'white'}}>Order </Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="tp-footer-widget footer-col-3 mb-50">
                <h4 style={{color:'white'}} className="tp-footer-widget-title">Infomation</h4>
                <div className="tp-footer-widget-content">
                  <ul>
                    <li><Link to={AboutUsPath} style={{color:'white'}}>About Us</Link></li>
                    <li><Link to={PrivacyPolicyPath} style={{color:'white'}}>Privacy Policy</Link></li>
                    <li><Link to={TermsAndConditionsPath} style={{color:'white'}}>Terms &amp; Conditions</Link></li>
                    <li><Link to={RefundAndCancellationPath} style={{color:'white'}}>Refund And Cancellation </Link></li>

                    <li><Link to={ContactPath} style={{color:'white'}}>Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="tp-footer-widget footer-col-4 mb-50">
                <h4 style={{color:'white'}} className="tp-footer-widget-title">Talk To Us</h4>
                <div className="tp-footer-widget-content">
                  <div className="tp-footer-talk mb-20">
                    <span style={{color:'white'}}>Got Questions? Call us</span>
                    <h4><a href="tel:+91 9961123654" style={{color:'white'}}>+91 99 611 23 654</a></h4>
                  </div>
                  <div className="tp-footer-contact">
                    <div className="tp-footer-contact-item d-flex align-items-start">
                      <div className="tp-footer-contact-icon">
                        <span>
                          <svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6H5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 11.4004H5.8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 8.19922H3.4" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
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
                  <p>© 2025 All Rights Reserved  |  Created by <a href="autogridnumberplate.com">autogridnumberplate.com</a>.</p>
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

    </>
  )
}

export default Footer