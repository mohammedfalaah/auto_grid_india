import React from 'react'
import { Link } from 'react-router-dom'
import { BasePath, ContactPath, ProductsPath } from '../utils/Constants'

const Header2 = () => {
  return (
    <>
<div id="header-sticky-2" className="tp-header-sticky-area">
    <div className="container">
      <div className="tp-mega-menu-wrapper p-relative">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-3 col-6">
            <div className="logo">
              <Link to={BasePath} >
              <img style={{width:'100px',height:'25px'}} src="/assets/img/logo/AGIWHITE.PNG"alt="logo" />

              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block">
            <div className="tp-header-sticky-menu main-menu menu-style-1">
              <nav id="mobile-menu"> 
                <ul>
                  <li className="has-dropdown has-mega-menu">
                        <Link to={BasePath}>Home</Link>
                    <div className="home-menu tp-submenu tp-mega-menu">
                      <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-5">
                        <div className="col">
                          <div className="home-menu-item ">
                            <a href="index.html">
                              <div className="home-menu-thumb p-relative fix">
                                <img src="/assets/img/menu/menu-home-1.jpg" alt />
                              </div>
                              <div className="home-menu-content">
                                <h5 className="home-menu-title">Electronics </h5>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col">
                          <div className="home-menu-item ">
                            <a href="index-2.html">
                              <div className="home-menu-thumb p-relative fix">
                                <img src="/assets/img/menu/menu-home-2.jpg" alt />
                              </div>
                              <div className="home-menu-content">
                                <h5 className="home-menu-title">Fashion</h5>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col">
                          <div className="home-menu-item ">
                            <a href="index-3.html">
                              <div className="home-menu-thumb p-relative fix">
                                <img src="/assets/img/menu/menu-home-3.jpg" alt />
                              </div>
                              <div className="home-menu-content">
                                <h5 className="home-menu-title">Beauty</h5>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col">
                          <div className="home-menu-item ">
                            <a href="index-4.html">
                              <div className="home-menu-thumb p-relative fix">
                                <img src="/assets/img/menu/menu-home-4.jpg" alt />
                              </div>
                              <div className="home-menu-content">
                                <h5 className="home-menu-title">Jewelry </h5>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col">
                          <div className="home-menu-item ">
                            <a href="index-5.html">
                              <div className="home-menu-thumb p-relative fix">
                                <img src="/assets/img/menu/menu-home-5.jpg" alt />
                              </div>
                              <div className="home-menu-content">
                                <h5 className="home-menu-title">Grocery</h5>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                  <li className="has-dropdown has-mega-menu ">
                    <Link to={ProductsPath}>Products</Link>
                  
                  </li>
                  <li><a href="coupon.html">Coupons</a></li>
              
                  <li><Link to={ContactPath}>Contact</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-6">
            <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
              <div className="tp-header-action-item d-none d-lg-block">
                <a href="compare.html" className="tp-header-action-btn">
                  <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8396 17.3319V3.71411" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.1556 13L15.0778 17.0967L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.91115 1.00056V14.6183" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0.833496 5.09667L4.91127 1L8.98905 5.09667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>                                       
                </a>
              </div>
              <div className="tp-header-action-item d-none d-lg-block">
                <a href="wishlist.html" className="tp-header-action-btn">
                  <svg width={22} height={20} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.239 18.8538C13.4096 17.5179 15.4289 15.9456 17.2607 14.1652C18.5486 12.8829 19.529 11.3198 20.1269 9.59539C21.2029 6.25031 19.9461 2.42083 16.4289 1.28752C14.5804 0.692435 12.5616 1.03255 11.0039 2.20148C9.44567 1.03398 7.42754 0.693978 5.57894 1.28752C2.06175 2.42083 0.795919 6.25031 1.87187 9.59539C2.46978 11.3198 3.45021 12.8829 4.73806 14.1652C6.56988 15.9456 8.58917 17.5179 10.7598 18.8538L10.9949 19L11.239 18.8538Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.26062 5.05302C6.19531 5.39332 5.43839 6.34973 5.3438 7.47501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> 
                  <span className="tp-header-action-badge">4</span>                          
                </a>
              </div>
              <div className="tp-header-action-item">
                <button type="button" className="tp-header-action-btn cartmini-open-btn">
                  <svg width={21} height={22} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.48626 20.5H14.8341C17.9004 20.5 20.2528 19.3924 19.5847 14.9348L18.8066 8.89359C18.3947 6.66934 16.976 5.81808 15.7311 5.81808H5.55262C4.28946 5.81808 2.95308 6.73341 2.4771 8.89359L1.69907 14.9348C1.13157 18.889 3.4199 20.5 6.48626 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.34902 5.5984C6.34902 3.21232 8.28331 1.27803 10.6694 1.27803V1.27803C11.8184 1.27316 12.922 1.72619 13.7362 2.53695C14.5504 3.3477 15.0081 4.44939 15.0081 5.5984V5.5984" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.70365 10.1018H7.74942" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5343 10.1018H13.5801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>    
                  <span className="tp-header-action-badge">13</span>                                                                          
                </button>
              </div>
              <div className="tp-header-action-item d-lg-none">
                <button type="button" className="tp-header-action-btn tp-offcanvas-open-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={16} viewBox="0 0 30 16">
                    <rect x={10} width={20} height={2} fill="currentColor" />
                    <rect x={5} y={7} width={25} height={2} fill="currentColor" />
                    <rect x={10} y={14} width={20} height={2} fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Header2