import React, { useEffect, useState,useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Helmet } from "react-helmet"
import { Link, useNavigate } from 'react-router-dom';
import ProductPage from './ProductPage';
import Axioscall from '../../services/Axioscall';
import { show_toast } from '../../utils/Toast';
import { addToCartApi, addToWishlistApi, productApi } from '../../services/BaseUrl';
import { ContextData } from '../../services/Context' 
// import { ContextData } from '../services/Context' 
const Home = () => {
    const navigate = useNavigate();
    const { getCart } = useContext(ContextData);

    const [products, setProducts] = useState([]);

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
      const [selectedProduct, setSelectedProduct] = useState(null);
    

      const fetchProducts = async () => {
        try {
          const response = await Axioscall("get",productApi,"","header");          
          setProducts(response.data.products);
        } catch (err) {
          show_toast(err.response?.data?.message || err.message);
        } 
      };

      const handleQuickView = (product) => {
        setSelectedProduct(product);
      };


const handleAddToWishlist = async (productId) => {
  try {
    if (!userId) {
      show_toast("You are not logged in. Please log in Then add items to Wishlist.",false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (!token) {
      show_toast("Authentication token not found. Please log in again.",false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    let body ={productId: productId}
    const response = await Axioscall ("post",addToWishlistApi,body,"header");
    if (response.data.success){
      show_toast(response.data.message,true); 

    }else{
      show_toast("Failed to add item to wishlist!",false);

    }
    
  } catch (error) {
    
  }
}
      const handleAddToCart = async (productId, quantity = 1) => {
          try {
            if (!userId) {
              show_toast("You are not logged in. Please log in Then add items to the cart.",false);
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              return;
            }
      
            if (!token) {
              show_toast("Authentication token not found. Please log in again.",false);
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              return;
            }
            let body = {
              userId: userId,
                productId: productId,
                quantity: quantity,
      
            }
      
            const response = await Axioscall("post",addToCartApi,body,"header");
           
            getCart()
      
            if (response.status ===200) {
        
              show_toast(response.data.message,true); 
            } else {
              show_toast(response.data.message,false);
            }
          } catch (error) {
            console.error("Error adding to cart:", error);
          }
        };
  
  useEffect(() => {
    // Load Instagram script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [])
  
  
  return (
    <>
    <div>

    
<div className="back-to-top-wrapper">
  <button id="back_to_top" type="button" className="back-to-top-btn">
    <svg width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 6L6 1L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>               
  </button>
</div>
{/* back to top end */}
{/* offcanvas area start */}
<div className="offcanvas__area offcanvas__radius">
  <div className="offcanvas__wrapper">
    <div className="offcanvas__close">
      <button className="offcanvas__close-btn offcanvas-close-btn">
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 1L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    <div className="offcanvas__content">
      <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
        <div className="offcanvas__logo logo">
          <a href="index.html">
          <img style={{width:'100px',height:'25px'}} src="/assets/img/logo/AGI.png" alt="logo" />

          </a>
        </div>
      </div>
      <div className="offcanvas__category pb-40">
        <button className="tp-offcanvas-category-toggle">
          <i className="fa-solid fa-bars" />
          All Categories
        </button>
        <div className="tp-category-mobile-menu">
        </div>
      </div>
      <div className="tp-main-menu-mobile fix d-lg-none mb-40" />
      <div className="offcanvas__contact align-items-center d-none">
        <div className="offcanvas__contact-icon mr-20">
          <span>
            <img src="/assets/img/icon/contact.png" alt />
          </span>
        </div>
        <div className="offcanvas__contact-content">
          <h3 className="offcanvas__contact-title">
            <a href="tel:098-852-987">004524865</a>
          </h3>
        </div>
      </div>
      <div className="offcanvas__btn">
        <a href="contact.html" className="tp-btn-2 tp-btn-border-2">Contact Us</a>
      </div>
    </div>
    <div className="offcanvas__bottom">
      <div className="offcanvas__footer d-flex align-items-center justify-content-between">
        <div className="offcanvas__currency-wrapper currency">
          <span className="offcanvas__currency-selected-currency tp-currency-toggle" id="tp-offcanvas-currency-toggle">Currency : USD</span>
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
              <img src="/assets/img/icon/language-flag.png" alt />
            </div>
            <div className="offcanvas__lang-wrapper">
              <span className="offcanvas__lang-selected-lang tp-lang-toggle" id="tp-offcanvas-lang-toggle">English</span>
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
{/* offcanvas area end */}
{/* mobile menu area start */}
<div id="tp-bottom-menu-sticky" className="tp-mobile-menu d-lg-none">
  <div className="container">
    <div className="row row-cols-5">
      <div className="col">
        <div className="tp-mobile-item text-center">
          <a href="shop.html" className="tp-mobile-item-btn">
            <i className="flaticon-store" />
            <span>Store</span>
          </a>
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
          <a href="wishlist.html" className="tp-mobile-item-btn">
            <i className="flaticon-love" />
            <span>Wishlist</span>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="tp-mobile-item text-center">
          <a href="profile.html" className="tp-mobile-item-btn">
            <i className="flaticon-user" />
            <span>Account</span>
          </a>
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
{/* mobile menu area end */}
{/* search area start */}
<section className="tp-search-area">
  <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <div className="tp-search-form">
          <div className="tp-search-close text-center mb-20">
            <button className="tp-search-close-btn tp-search-close-btn" />
          </div>
          <form action="#">
            <div className="tp-search-input mb-10">
              <input type="text" placeholder="Search for product..." />
              <button type="submit"><i className="flaticon-search-1" /></button>
            </div>
            <div className="tp-search-category">
              <span>Search by : </span>
              <a href="#">Men, </a>
              <a href="#">Women, </a>
              <a href="#">Children, </a>
              <a href="#">Shirt, </a>
              <a href="#">Demin</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
{/* search area end */}
{/* cart mini area start */}
<div className="cartmini__area tp-all-font-roboto">
  <div className="cartmini__wrapper d-flex justify-content-between flex-column">
    <div className="cartmini__top-wrapper">
      <div className="cartmini__top p-relative">
        <div className="cartmini__top-title">
          <h4>Shopping cart</h4>
        </div>
        <div className="cartmini__close">
          <button type="button" className="cartmini__close-btn cartmini-close-btn"><i className="fal fa-times" /></button>
        </div>
      </div>
      <div className="cartmini__shipping">
        <p> Free Shipping for all orders over <span>$50</span></p>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" data-width="70%" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
        </div>                   
      </div>
      <div className="cartmini__widget">
        <div className="cartmini__widget-item">
          <div className="cartmini__thumb">
            <a href="product-details.html">
              <img src="/assets/img/product/product-1.jpg" alt />
            </a>
          </div>
          <div className="cartmini__content">
            <h5 className="cartmini__title"><a href="product-details.html">Level Bolt Smart Lock</a></h5>
            <div className="cartmini__price-wrapper">
              <span className="cartmini__price">$46.00</span>
              <span className="cartmini__quantity">x2</span>
            </div>
          </div>
          <a href="#" className="cartmini__del"><i className="fa-regular fa-xmark" /></a>
        </div>
      </div>
      {/* for wp */}
      {/* if no item in cart */}
      <div className="cartmini__empty text-center d-none">
        <img src="/assets/img/product/cartmini/empty-cart.png" alt />
        <p>Your Cart is empty</p>
        <a href="shop.html" className="tp-btn">Go to Shop</a>
      </div>
    </div>
    <div className="cartmini__checkout">
      <div className="cartmini__checkout-title mb-30">
        <h4>Subtotal:</h4>
        <span>$113.00</span>
      </div>
      <div className="cartmini__checkout-btn">
        <a href="cart.html" className="tp-btn mb-10 w-100"> view cart</a>
        <a href="checkout.html" className="tp-btn tp-btn-border w-100"> checkout</a>
      </div>
    </div>
  </div>
</div>
{/* cart mini area end */}


<main>
  {/* slider area start */}
  <section className="tp-slider-area p-relative z-index-1">
    <Carousel>
      {/* First Slide */}
      <Carousel.Item interval={1000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_01.1.jpg" alt="Slide 1" />
        {/* Uncomment if you want captions */}
        {/* 
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> 
        */}
      </Carousel.Item>

      {/* Second Slide */}
      <Carousel.Item interval={2000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_01.jpg" alt="Slide 2" />
        {/* 
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> 
        */}
      </Carousel.Item>

      {/* Third Slide */}
      <Carousel.Item interval={3000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_02.jpg" alt="Slide 3" />
        {/* 
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption> 
        */}
      </Carousel.Item>

      {/* Fourth Slide */}
      <Carousel.Item interval={4000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_03.jpg" alt="Slide 4" />
   
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_04.jpg" alt="Slide 4" />
    
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_05.jpg" alt="Slide 4" />
        {/* 
        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> 
        */}
      </Carousel.Item>
      <Carousel.Item interval={7000}>
        <img style={{ width: '100%' }} src="/assets/img/slider/AGI_banner_06.jpg" alt="Slide 4" />
        {/* 
        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> 
        */}
      </Carousel.Item>

      
    </Carousel>
  </section>

  <section className="tp-product-category pt-60 pb-15">
    <div className="container">
      <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-sm-6 row-cols-md-4">
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/iPhone SE - 1 (1).jpg" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">CAR ALUMINIUM PUNCHING</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}}  className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/bike_aluminium_punching.png" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">BIKE ALUMINIUM PUNCHING</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/gel_frame.png" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">CAR GEL FRAME</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/bike_gel_frame.png" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">BIKE GEL FRAME</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item  text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/bike_gel_plates.jpg" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">BIKE GEL PLATES</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/mirror-hanging.png" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">MIRROR HANGING</a>
              </h3>
      
            </div>
          </div>
        </div>
        <div className="col">
          <div style={{height:'250px'}} className="tp-product-category-item tp-product-item text-center mb-40">
            <div className="tp-product-category-thumb fix">
              <a href="shop-category.html">
                <img style={{width:'200px'}} src="/assets/img/product/keychain.png" alt="product-category" />
              </a>
            </div>
            <div className="tp-product-category-content">
              <h3 className="tp-product-category-title">
                <a href="shop-category.html">KEY CHAINS</a>
              </h3>
      
            </div>
          </div>
        </div>
     
    
       
      </div>
    </div>
  </section>
  
  <section className="tp-feature-area tp-feature-border-radius pb-70">
    <div className="container">
      <div className="row gx-1 gy-1 gy-xl-0">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="tp-feature-item d-flex align-items-start">
            <div className="tp-feature-icon mr-15">
              <span>
                <svg width={33} height={27} viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.7222 1H31.5555V19.0556H10.7222V1Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.7222 7.94446H5.16667L1.00001 12.1111V19.0556H10.7222V7.94446Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25.3055 26C23.3879 26 21.8333 24.4454 21.8333 22.5278C21.8333 20.6101 23.3879 19.0555 25.3055 19.0555C27.2232 19.0555 28.7778 20.6101 28.7778 22.5278C28.7778 24.4454 27.2232 26 25.3055 26Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.25001 26C5.33235 26 3.77778 24.4454 3.77778 22.5278C3.77778 20.6101 5.33235 19.0555 7.25001 19.0555C9.16766 19.0555 10.7222 20.6101 10.7222 22.5278C10.7222 24.4454 9.16766 26 7.25001 26Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>                                                        
              </span>
            </div>
            <div className="tp-feature-content">
              <h3 className="tp-feature-title">Fastest <br /> Shipping</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="tp-feature-item d-flex align-items-start">
            <div className="tp-feature-icon mr-15">
              <span>
                <svg width={21} height={35} viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3636 1V34" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.8636 7H6.61365C5.22126 7 3.8859 7.55312 2.90134 8.53769C1.91677 9.52226 1.36365 10.8576 1.36365 12.25C1.36365 13.6424 1.91677 14.9777 2.90134 15.9623C3.8859 16.9469 5.22126 17.5 6.61365 17.5H14.1136C15.506 17.5 16.8414 18.0531 17.826 19.0377C18.8105 20.0223 19.3636 21.3576 19.3636 22.75C19.3636 24.1424 18.8105 25.4777 17.826 26.4623C16.8414 27.4469 15.506 28 14.1136 28H1.36365" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>                                                        
              </span>
            </div>
            <div className="tp-feature-content">
              <h3 className="tp-feature-title">100%  SAFE <br /> PAYMENT </h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="tp-feature-item d-flex align-items-start">
            <div className="tp-feature-icon mr-15">
              <span>
                <svg width={31} height={30} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_1211_583" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={31} height={30}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H30.0024V29.9998H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1211_583)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4168 27.1116C14.3017 27.9756 15.7266 27.9651 16.6056 27.0816L17.6885 26.0017C18.5285 25.1632 19.6894 24.6848 20.8728 24.6848H22.4178C23.6687 24.6848 24.6856 23.6678 24.6856 22.4184V20.875C24.6856 19.6736 25.1506 18.5441 25.9995 17.6937L27.0795 16.6122C27.519 16.1713 27.7544 15.5998 27.7529 14.9938C27.7514 14.3894 27.513 13.8209 27.0825 13.3919L26.001 12.309C25.1506 11.4525 24.6856 10.3246 24.6856 9.12318V7.58277C24.6856 6.33184 23.6687 5.3149 22.4178 5.3149H20.8758C19.6744 5.3149 18.545 4.84842 17.6945 4.00397L16.6116 2.91954C15.7101 2.02709 14.2717 2.03159 13.3913 2.91804L12.3128 3.99947C11.4519 4.84992 10.3225 5.3149 9.12553 5.3149H7.58212C6.33269 5.3164 5.31575 6.33334 5.31575 7.58277V9.12018C5.31575 10.3216 4.84927 11.451 4.00332 12.303L2.93839 13.3694C2.92789 13.3814 2.91739 13.3904 2.90689 13.4009C2.02644 14.2874 2.03094 15.7258 2.91739 16.6062L4.00032 17.6892C4.84927 18.5411 5.31575 19.6706 5.31575 20.872V22.4184C5.31575 23.6678 6.33119 24.6848 7.58212 24.6848H9.12253C10.3255 24.6863 11.4549 25.1527 12.3053 26.0002L13.3868 27.0786C13.3958 27.0891 13.4063 27.0996 13.4168 27.1116ZM14.9972 30.0002C13.8468 30.0002 12.6963 29.5652 11.8159 28.6923C11.8039 28.6803 11.7919 28.6683 11.7799 28.6548L10.715 27.5914C10.2905 27.1699 9.72352 26.9359 9.12055 26.9344H7.58164C5.09029 26.9344 3.06541 24.908 3.06541 22.4182V20.8717C3.06541 20.2688 2.82992 19.7033 2.40694 19.2773L1.32851 18.2004C-0.423392 16.4575 -0.444391 13.6197 1.27601 11.8498C1.28951 11.8363 1.30301 11.8228 1.31651 11.8093L2.40844 10.7143C2.82992 10.2899 3.06541 9.72139 3.06541 9.11993V7.58252C3.06541 5.09266 5.09029 3.06628 7.58014 3.06478H9.12505C9.72652 3.06478 10.2935 2.82929 10.724 2.40482L11.7964 1.32938C13.5498 -0.436017 16.4161 -0.445016 18.1845 1.31288L19.281 2.40932C19.7054 2.83079 20.2724 3.06478 20.8754 3.06478H22.4173C24.9086 3.06478 26.935 5.09116 26.935 7.58252V9.12293C26.935 9.72439 27.169 10.2929 27.5935 10.7203L28.6704 11.7988C29.5239 12.6462 29.9978 13.7787 30.0023 14.9861C30.0068 16.1935 29.5404 17.329 28.6899 18.1854L27.5905 19.2818C27.169 19.7063 26.935 20.2718 26.935 20.8747V22.4182C26.935 24.908 24.9086 26.9344 22.4188 26.9344H20.8724C20.2784 26.9344 19.6979 27.1744 19.2765 27.5929L18.1995 28.6698C17.3191 29.5562 16.1581 30.0002 14.9972 30.0002Z" fill="currentColor" />
                  </g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.145 19.9811C10.857 19.9811 10.569 19.8716 10.3501 19.6511C9.91058 19.2116 9.91058 18.5006 10.3501 18.0612L18.0596 10.3501C18.4991 9.91064 19.2115 9.91064 19.651 10.3501C20.0905 10.7896 20.0905 11.502 19.651 11.9415L11.94 19.6511C11.721 19.8716 11.433 19.9811 11.145 19.9811Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.7544 20.2476C17.925 20.2476 17.247 19.5772 17.247 18.7477C17.247 17.9183 17.9115 17.2478 18.7409 17.2478H18.7544C19.5839 17.2478 20.2543 17.9183 20.2543 18.7477C20.2543 19.5772 19.5839 20.2476 18.7544 20.2476Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.2548 12.748C10.4254 12.748 9.74744 12.0775 9.74744 11.2481C9.74744 10.4186 10.4119 9.74817 11.2413 9.74817H11.2548C12.0843 9.74817 12.7548 10.4186 12.7548 11.2481C12.7548 12.0775 12.0843 12.748 11.2548 12.748Z" fill="currentColor" />
                </svg>                                                                                        
              </span>
            </div>
            <div className="tp-feature-content">
              <h3 className="tp-feature-title">NO 1 CUSTOM NUMBER PLATES MAKER</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="tp-feature-item d-flex align-items-start">
            <div className="tp-feature-icon mr-15">
              <span>
                <svg width={31} height={30} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 24.3333V15C1.5 11.287 2.975 7.72602 5.60051 5.10051C8.22602 2.475 11.787 1 15.5 1C19.213 1 22.774 2.475 25.3995 5.10051C28.025 7.72602 29.5 11.287 29.5 15V24.3333" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29.5 25.8889C29.5 26.714 29.1722 27.5053 28.5888 28.0888C28.0053 28.6722 27.214 29 26.3889 29H24.8333C24.0082 29 23.2169 28.6722 22.6335 28.0888C22.05 27.5053 21.7222 26.714 21.7222 25.8889V21.2222C21.7222 20.3971 22.05 19.6058 22.6335 19.0223C23.2169 18.4389 24.0082 18.1111 24.8333 18.1111H29.5V25.8889ZM1.5 25.8889C1.5 26.714 1.82778 27.5053 2.41122 28.0888C2.99467 28.6722 3.78599 29 4.61111 29H6.16667C6.99179 29 7.78311 28.6722 8.36656 28.0888C8.95 27.5053 9.27778 26.714 9.27778 25.8889V21.2222C9.27778 20.3971 8.95 19.6058 8.36656 19.0223C7.78311 18.4389 6.99179 18.1111 6.16667 18.1111H1.5V25.8889Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>                                                                                       
              </span>
            </div>
            <div className="tp-feature-content">
              <h3 className="tp-feature-title">Support <br /> 24/7</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* feature area end */}
  {/* product area start */}
  <section className="tp-product-area pb-55">
    <div className="container">
      <div className="row align-items-end">
        <div className="col-xl-5 col-lg-6 col-md-5">
          <div className="tp-section-title-wrapper mb-40">
            <h3 className="tp-section-title"> Products </h3>
          </div>
        </div>
       
      </div>
      <div className="row">
           <div className="col-xl-12">
           <div className="tp-product-tab-content">
             <div className="tab-content" id="myTabContent">
               <div className="tab-pane fade show active" id="new-tab-pane" role="tabpanel" aria-labelledby="new-tab" tabIndex={0}>
                 <div className="row">
                 {products.slice(0,8).map ((products,index) => 
                <div className="col-xl-3 col-lg-3 col-sm-6">
                <div className="tp-product-item transition-3 mb-25">
                  <div className="tp-product-thumb p-relative fix m-img">
                    <a onClick={() => handleQuickView(products)}>
                    <img
  src={`https://node.autogridnumberplate.com${products.photographs?.[0] || ""}`}
  alt={products.productName}
/>                       </a>
                    {/* product badge */}
                 
                    {/* product action */}
                    <div className="tp-product-action">
                      <div className="tp-product-action-item d-flex flex-column">
                        <button 
                                          onClick={() => handleAddToCart(products._id)}

                        type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                          </svg>   
                          <span className="tp-product-tooltip">Add to Cart</span>
                        </button>
                        <button onClick={() => handleQuickView(products)} type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                          <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                            <g mask="url(#mask0_1211_721)">
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                            </g>
                          </svg>                                          
                          <span className="tp-product-tooltip">Quick View</span>
                        </button>
                        <button onClick={() => handleAddToWishlist(products._id)} type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                          <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                          </svg>                                                                                
                          <span className="tp-product-tooltip">Add To Wishlist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* product content */}
                  <div className="tp-product-content">
                    <div className="tp-product-category">
                      <a href="shop.html">Backpacks</a>
                    </div>
                    <h3 className="tp-product-title">
                    {products.productName}
                    </h3>
                   
                    <div className="tp-product-price-wrapper">
                    <span style={{paddingRight:'10px'}} className="tp-product-price-2 new-price">₹{products?.currentPrice??""}</span>
                    <span className="tp-product-price-2 old-price">₹{products?.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
                )}
             
                   
                 </div>
               </div>
               <div className="tab-pane fade" id="featured-tab-pane" role="tabpanel" aria-labelledby="featured-tab" tabIndex={0}>
                 <div className="row">
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-trending">Trending</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Powerbank</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Mini Portable PD 22.5W Fast Charging Powerbank.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(6 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price">$72.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5-1.jpg" alt="product-electronic" />
                         </a>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Heat Pipes</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             CPU Cooler 2 Heat Pipes 12mm 4 Pin PWM RGB for Intel.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(4 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price">$133.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5-2.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-sale">Sale</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Gaming</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Playstation 4 2TB Slim Gaming Console.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(4 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price">$142.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5-3.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-hot">Hot</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Backpacks</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Mini Portable Mobile Phone Powerbank for iphone.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(4 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$120.00</span>
                           <span className="tp-product-price new-price">$97.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item p-relative transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-1.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-hot">Hot</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Tablet</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star-half-stroke" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(7 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$320.00</span>
                           <span className="tp-product-price new-price">$247.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-2.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-trending">Trending</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Smart Watch</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Tracker with IP67 Waterproof Pedometer Smart watch.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(6 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price">$72.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-3.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-offer">-25%</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Headphone</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Cancelling Headphones Wireless.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star-half-stroke" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(5 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$1400.00</span>
                           <span className="tp-product-price new-price">$120.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-4.jpg" alt="product-electronic" />
                         </a>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">HD Camera</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Professional Camera 4K Digital Video Camera.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(15 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$475.00</span>
                           <span className="tp-product-price new-price">$340.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="tab-pane fade" id="topsell-tab-pane" role="tabpanel" aria-labelledby="topsell-tab" tabIndex={0}>
                 <div className="row">
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5-2.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-sale">Sale</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                    
                     </div>
                   </div>
                 
                 
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-5-1.jpg" alt="product-electronic" />
                         </a>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Heat Pipes</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             CPU Cooler 2 Heat Pipes 12mm 4 Pin PWM RGB for Intel.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(4 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price">$133.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-3.jpg" alt="product-electronic" />
                         </a>
                         {/* product badge */}
                         <div className="tp-product-badge">
                           <span className="product-offer">-25%</span>
                         </div>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">Headphone</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Cancelling Headphones Wireless.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star-half-stroke" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(5 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$1400.00</span>
                           <span className="tp-product-price new-price">$120.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-xl-3 col-lg-3 col-sm-6">
                     <div className="tp-product-item transition-3 mb-25">
                       <div className="tp-product-thumb p-relative fix m-img">
                         <a href="product-details.html">
                           <img src="/assets/img/product/product-4.jpg" alt="product-electronic" />
                         </a>
                         {/* product action */}
                         <div className="tp-product-action">
                           <div className="tp-product-action-item d-flex flex-column">
                             <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
                               <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor" />
                               </svg>   
                               <span className="tp-product-tooltip">Add to Cart</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                               <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
                                 <g mask="url(#mask0_1211_721)">
                                   <path fillRule="evenodd" clipRule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor" />
                                 </g>
                               </svg>                                          
                               <span className="tp-product-tooltip">Quick View</span>
                             </button>
                             <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
                               <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor" />
                               </svg>                                                                                
                               <span className="tp-product-tooltip">Add To Wishlist</span>
                             </button>
                           </div>
                         </div>
                       </div>
                       {/* product content */}
                       <div className="tp-product-content">
                         <div className="tp-product-category">
                           <a href="shop.html">HD Camera</a>
                         </div>
                         <h3 className="tp-product-title">
                           <a href="product-details.html">
                             Professional Camera 4K Digital Video Camera.
                           </a>
                         </h3>
                         <div className="tp-product-rating d-flex align-items-center">
                           <div className="tp-product-rating-icon">
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                             <span><i className="fa-solid fa-star" /></span>
                           </div>
                           <div className="tp-product-rating-text">
                             <span>(15 Review)</span>
                           </div>
                         </div>
                         <div className="tp-product-price-wrapper">
                           <span className="tp-product-price old-price">$475.00</span>
                           <span className="tp-product-price new-price">$340.00</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>                         
           </div>
         </div>


       
      </div>
    </div>
  </section>
 



  {/* product sm area end */}
  {/* blog area start */}

  {/* blog area end */}
  {/* instagram area start */}
  <div className="tp-instagram-area pb-70">
    <div className="container">
      <div className="row row-cols-lg-8 row-cols-md-3 row-cols-sm-3 row-cols-1">
        <div className="col">
          <div className="tp-instagram-item p-relative z-index-1 fix mb-30 w-img">
          <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DB3yXoRTJgo/?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <div style={{ padding: "16px" }}>
          <a
            href="https://www.instagram.com/p/DB3yXoRTJgo/?utm_source=ig_embed&utm_campaign=loading"
            style={{
              background: "#FFFFFF",
              lineHeight: 0,
              padding: "0 0",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>

            <div className="tp-instagram-icon">
              
              <a href="https://www.instagram.com/p/DB3yXoRTJgo/?utm_source=ig_embed&utm_campaign=loading" className="popup-image">
              <i className="fa-brands fa-instagram" /></a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="p-relative  fix mb-30 w-img">
          <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/reel/C7luVnXNVq9/?utm_source=ig_embed&amp;utm_campaign=loading"
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: "3px",
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px",
        maxWidth: "540px",
        minWidth: "326px",
        padding: 0,
        width: "calc(100% - 2px)",
      }}
    >
      <div style={{ padding: "16px" }}>
        <a
          href="https://www.instagram.com/reel/C7luVnXNVq9/?utm_source=ig_embed&amp;utm_campaign=loading"
          style={{
            background: "#FFFFFF",
            lineHeight: 0,
            padding: 0,
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ padding: "19% 0" }}></div>
          <div
            style={{
              display: "block",
              height: "50px",
              margin: "0 auto 12px",
              width: "50px",
            }}
          >
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {/* Add the SVG paths here */}
            </svg>
          </div>
          <div style={{ paddingTop: "8px" }}>
            <div
              style={{
                color: "#3897f0",
                fontFamily: "Arial,sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 550,
                lineHeight: "18px",
              }}
            >
              View this post on Instagram
            </div>
          </div>
        </a>
      </div>
      <p
        style={{
          color: "#c9c8cd",
          fontFamily: "Arial,sans-serif",
          fontSize: "14px",
          lineHeight: "17px",
          marginBottom: 0,
          marginTop: "8px",
          overflow: "hidden",
          padding: "8px 0 7px",
          textAlign: "center",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <a
          href="https://www.instagram.com/reel/C7luVnXNVq9/?utm_source=ig_embed&amp;utm_campaign=loading"
          style={{
            color: "#c9c8cd",
            fontFamily: "Arial,sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: "17px",
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          A post shared by Autogrid India (@autogridindia)
        </a>
      </p>
    </blockquote>
           
          </div>
        </div>
        <div className="col">
          <div className="tp-instagram-item p-relative z-index-1 fix mb-30 w-img">
          <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/p/DBRID07zweA/?utm_source=ig_embed&amp;utm_campaign=loading"
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px',
        maxWidth: '540px',
        minWidth: '326px',
        padding: 0,
        width: '99.375%',
      }}
    >
      <div style={{ padding: '16px' }}>
        <a
          href="https://www.instagram.com/p/DBRID07zweA/?utm_source=ig_embed&amp;utm_campaign=loading"
          style={{
            background: '#FFFFFF',
            lineHeight: 0,
            padding: '0 0',
            textAlign: 'center',
            textDecoration: 'none',
            width: '100%',
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ padding: '19% 0' }}></div>
          <div
            style={{
              display: 'block',
              height: '50px',
              margin: '0 auto 12px',
              width: '50px',
            }}
          >
            {/* SVG or Placeholder */}
          </div>
          <div style={{ paddingTop: '8px' }}>
            <div
              style={{
                color: '#3897f0',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 550,
                lineHeight: '18px',
              }}
            >
              View this post on Instagram
            </div>
          </div>
        </a>
      </div>
    </blockquote>

            <div className="tp-instagram-icon">
              
              <a href="https://www.instagram.com/p/DBRID07zweA/?utm_source=ig_embed&amp;utm_campaign=loading" className="popup-image">
              <i className="fa-brands fa-instagram" /></a>
            </div>
          </div>
        </div>
       
       
    
      </div>
    </div>
  </div>
  {/* instagram area end */}
  {/* subscribe area start */}
  <section className="tp-subscribe-area pt-70 pb-65 theme-bg p-relative z-index-1">
    <div className="tp-subscribe-shape">
      <img className="tp-subscribe-shape-1" src="/assets/img/subscribe/subscribe-shape-1.png" alt />
      <img className="tp-subscribe-shape-2" src="/assets/img/subscribe/subscribe-shape-2.png" alt />
      <img className="tp-subscribe-shape-3" src="/assets/img/subscribe/subscribe-shape-3.png" alt />
      <img className="tp-subscribe-shape-4" src="/assets/img/subscribe/subscribe-shape-4.png" alt />
      {/* plane shape */}
      <div className="tp-subscribe-plane">
        <img className="tp-subscribe-plane-shape" src="/assets/img/subscribe/plane.png" alt />
        <svg width={399} height={110} className="d-none d-sm-block" viewBox="0 0 399 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22" stroke="white" strokeOpacity="0.5" strokeDasharray="3 3" />
        </svg>
        <svg className="d-sm-none" width={193} height={110} viewBox="0 0 193 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1C4.85463 20.0046 26.9085 13.6461 29.9086 40.0095C32.372 61.6569 13.5053 130.362 7.98637 90.0217C-3.57698 5.50061 85.7981 127.53 106.034 106.525C145.807 65.2398 98.0842 -57.9337 166.742 40.0093C176.137 53.412 185.773 22.0046 193 22.0046" stroke="white" strokeOpacity="0.5" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xl-7 col-lg-7">
          <div className="tp-subscribe-content">
            <span>Sale 20% off all store</span>
            <h3 className="tp-subscribe-title">Subscribe our Newsletter</h3>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5">
          <div className="tp-subscribe-form">
            <form action="#">
              <div className="tp-subscribe-input">
                <input type="email" placeholder="Enter Your Email" />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* subscribe area end */}   
  <div className="modal fade tp-product-modal" id="producQuickViewModal" tabIndex={-1} aria-labelledby="producQuickViewModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {selectedProduct ? (
            <>
             <div className="tp-product-modal-content d-lg-flex align-items-start">
            <button type="button" className="tp-product-modal-close-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal"><i className="fa-regular fa-xmark" /></button>
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
                      className={`nav-link ${index === 0 ? "active" : ""}`}
                      id={`nav-${index + 1}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#nav-${index + 1}`}
                      type="button"
                      role="tab"
                      aria-controls={`nav-${index + 1}`}
                      aria-selected={index === 0}
                    >
                      <img
 src={`https://node.autogridnumberplate.com${photo}`}                        alt={`Thumbnail ${index + 1}`}
                        className="img-fluid"
                      />
                    </button>
                  ))}
                </div>
              </nav>
              <div className="tab-content m-img" id="productDetailsNavContent" style={{width:'25rem'}}>
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
 src={`https://node.autogridnumberplate.com${photo}`}                        alt={`Main View ${index + 1}`}
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
              <h3 className="tp-product-details-title">{selectedProduct.productName}</h3>
              {/* inventory details */}
            
              <p>{selectedProduct.specifications}</p>
              {/* price */}
              <div className="tp-product-details-price-wrapper mb-20">
                <span className="tp-product-details-price old-price">₹{selectedProduct.originalPrice}</span>
                <span className="tp-product-details-price new-price">₹{selectedProduct.currentPrice}</span>
              </div>
              <br />
            
              {/* actions */}
              <div className="tp-product-details-action-wrapper">
              
                <button  onClick={() => handleAddToCart(selectedProduct._id)}
                 className="tp-product-details-buy-now-btn w-100">Add to Cart</button>
              </div>
              <div className="tp-product-details-action-wrapper">
              
                <button onClick={() => handleAddToWishlist(selectedProduct._id)}
                 className="tp-product-details-buy-now-btn w-100">Add to Wislist</button>
              </div>
              <div className="tp-product-details-action-sm">
              
                {/* <button type="button" className="tp-product-details-action-sm-btn">
                  <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.33541 7.54172C3.36263 10.6766 7.42094 13.2113 8.49945 13.8387C9.58162 13.2048 13.6692 10.6421 14.6635 7.5446C15.3163 5.54239 14.7104 3.00621 12.3028 2.24514C11.1364 1.8779 9.77578 2.1014 8.83648 2.81432C8.64012 2.96237 8.36757 2.96524 8.16974 2.81863C7.17476 2.08487 5.87499 1.86999 4.69024 2.24514C2.28632 3.00549 1.68259 5.54167 2.33541 7.54172ZM8.50115 15C8.4103 15 8.32018 14.9784 8.23812 14.9346C8.00879 14.8117 2.60674 11.891 1.29011 7.87081C1.28938 7.87081 1.28938 7.8701 1.28938 7.8701C0.462913 5.33895 1.38316 2.15812 4.35418 1.21882C5.7492 0.776121 7.26952 0.97088 8.49895 1.73195C9.69029 0.993159 11.2729 0.789057 12.6401 1.21882C15.614 2.15956 16.5372 5.33966 15.7115 7.8701C14.4373 11.8443 8.99571 14.8088 8.76492 14.9332C8.68286 14.9777 8.592 15 8.50115 15Z" fill="currentColor" />
                    <path d="M8.49945 13.8387L8.42402 13.9683L8.49971 14.0124L8.57526 13.9681L8.49945 13.8387ZM14.6635 7.5446L14.5209 7.4981L14.5207 7.49875L14.6635 7.5446ZM12.3028 2.24514L12.348 2.10211L12.3478 2.10206L12.3028 2.24514ZM8.83648 2.81432L8.92678 2.93409L8.92717 2.9338L8.83648 2.81432ZM8.16974 2.81863L8.25906 2.69812L8.25877 2.69791L8.16974 2.81863ZM4.69024 2.24514L4.73548 2.38815L4.73552 2.38814L4.69024 2.24514ZM8.23812 14.9346L8.16727 15.0668L8.16744 15.0669L8.23812 14.9346ZM1.29011 7.87081L1.43266 7.82413L1.39882 7.72081H1.29011V7.87081ZM1.28938 7.8701L1.43938 7.87009L1.43938 7.84623L1.43197 7.82354L1.28938 7.8701ZM4.35418 1.21882L4.3994 1.36184L4.39955 1.36179L4.35418 1.21882ZM8.49895 1.73195L8.42 1.85949L8.49902 1.90841L8.57801 1.85943L8.49895 1.73195ZM12.6401 1.21882L12.6853 1.0758L12.685 1.07572L12.6401 1.21882ZM15.7115 7.8701L15.5689 7.82356L15.5686 7.8243L15.7115 7.8701ZM8.76492 14.9332L8.69378 14.8011L8.69334 14.8013L8.76492 14.9332ZM2.19287 7.58843C2.71935 9.19514 4.01596 10.6345 5.30013 11.744C6.58766 12.8564 7.88057 13.6522 8.42402 13.9683L8.57487 13.709C8.03982 13.3978 6.76432 12.6125 5.49626 11.517C4.22484 10.4185 2.97868 9.02313 2.47795 7.49501L2.19287 7.58843ZM8.57526 13.9681C9.12037 13.6488 10.4214 12.8444 11.7125 11.729C12.9999 10.6167 14.2963 9.17932 14.8063 7.59044L14.5207 7.49875C14.0364 9.00733 12.7919 10.4 11.5164 11.502C10.2446 12.6008 8.9607 13.3947 8.42364 13.7093L8.57526 13.9681ZM14.8061 7.59109C15.1419 6.5613 15.1554 5.39131 14.7711 4.37633C14.3853 3.35729 13.5989 2.49754 12.348 2.10211L12.2576 2.38816C13.4143 2.75381 14.1347 3.54267 14.4905 4.48255C14.8479 5.42648 14.8379 6.52568 14.5209 7.4981L14.8061 7.59109ZM12.3478 2.10206C11.137 1.72085 9.72549 1.95125 8.7458 2.69484L8.92717 2.9338C9.82606 2.25155 11.1357 2.03494 12.2577 2.38821L12.3478 2.10206ZM8.74618 2.69455C8.60221 2.8031 8.40275 2.80462 8.25906 2.69812L8.08043 2.93915C8.33238 3.12587 8.67804 3.12163 8.92678 2.93409L8.74618 2.69455ZM8.25877 2.69791C7.225 1.93554 5.87527 1.71256 4.64496 2.10213L4.73552 2.38814C5.87471 2.02742 7.12452 2.2342 8.08071 2.93936L8.25877 2.69791ZM4.64501 2.10212C3.39586 2.49722 2.61099 3.35688 2.22622 4.37554C1.84299 5.39014 1.85704 6.55957 2.19281 7.58826L2.478 7.49518C2.16095 6.52382 2.15046 5.42513 2.50687 4.48154C2.86175 3.542 3.58071 2.7534 4.73548 2.38815L4.64501 2.10212ZM8.50115 14.85C8.43415 14.85 8.36841 14.8341 8.3088 14.8023L8.16744 15.0669C8.27195 15.1227 8.38645 15.15 8.50115 15.15V14.85ZM8.30897 14.8024C8.19831 14.7431 6.7996 13.9873 5.26616 12.7476C3.72872 11.5046 2.07716 9.79208 1.43266 7.82413L1.14756 7.9175C1.81968 9.96978 3.52747 11.7277 5.07755 12.9809C6.63162 14.2373 8.0486 15.0032 8.16727 15.0668L8.30897 14.8024ZM1.29011 7.72081C1.31557 7.72081 1.34468 7.72745 1.37175 7.74514C1.39802 7.76231 1.41394 7.78437 1.42309 7.8023C1.43191 7.81958 1.43557 7.8351 1.43727 7.84507C1.43817 7.8504 1.43869 7.85518 1.43898 7.85922C1.43913 7.86127 1.43923 7.8632 1.43929 7.865C1.43932 7.86591 1.43934 7.86678 1.43936 7.86763C1.43936 7.86805 1.43937 7.86847 1.43937 7.86888C1.43937 7.86909 1.43937 7.86929 1.43938 7.86949C1.43938 7.86959 1.43938 7.86969 1.43938 7.86979C1.43938 7.86984 1.43938 7.86992 1.43938 7.86994C1.43938 7.87002 1.43938 7.87009 1.28938 7.8701C1.13938 7.8701 1.13938 7.87017 1.13938 7.87025C1.13938 7.87027 1.13938 7.87035 1.13938 7.8704C1.13938 7.8705 1.13938 7.8706 1.13938 7.8707C1.13938 7.8709 1.13938 7.87111 1.13938 7.87131C1.13939 7.87173 1.13939 7.87214 1.1394 7.87257C1.13941 7.87342 1.13943 7.8743 1.13946 7.8752C1.13953 7.87701 1.13962 7.87896 1.13978 7.88103C1.14007 7.88512 1.14059 7.88995 1.14151 7.89535C1.14323 7.90545 1.14694 7.92115 1.15585 7.93861C1.16508 7.95672 1.18114 7.97896 1.20762 7.99626C1.2349 8.01409 1.26428 8.02081 1.29011 8.02081V7.72081ZM1.43197 7.82354C0.623164 5.34647 1.53102 2.26869 4.3994 1.36184L4.30896 1.0758C1.23531 2.04755 0.302663 5.33142 1.14679 7.91665L1.43197 7.82354ZM4.39955 1.36179C5.7527 0.932384 7.22762 1.12136 8.42 1.85949L8.57791 1.60441C7.31141 0.820401 5.74571 0.619858 4.30881 1.07585L4.39955 1.36179ZM8.57801 1.85943C9.73213 1.14371 11.2694 0.945205 12.5951 1.36192L12.685 1.07572C11.2763 0.632908 9.64845 0.842602 8.4199 1.60447L8.57801 1.85943ZM12.5948 1.36184C15.4664 2.27018 16.3769 5.34745 15.5689 7.82356L15.8541 7.91663C16.6975 5.33188 15.7617 2.04893 12.6853 1.07581L12.5948 1.36184ZM15.5686 7.8243C14.9453 9.76841 13.2952 11.4801 11.7526 12.7288C10.2142 13.974 8.80513 14.7411 8.69378 14.8011L8.83606 15.0652C8.9555 15.0009 10.3826 14.2236 11.9413 12.9619C13.4957 11.7037 15.2034 9.94602 15.8543 7.91589L15.5686 7.8243ZM8.69334 14.8013C8.6337 14.8337 8.56752 14.85 8.50115 14.85V15.15C8.61648 15.15 8.73201 15.1217 8.83649 15.065L8.69334 14.8013Z" fill="currentColor" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.8384 6.93209C12.5548 6.93209 12.3145 6.71865 12.2911 6.43693C12.2427 5.84618 11.8397 5.34743 11.266 5.1656C10.9766 5.07361 10.8184 4.76962 10.9114 4.48718C11.0059 4.20402 11.3129 4.05023 11.6031 4.13934C12.6017 4.45628 13.3014 5.32371 13.3872 6.34925C13.4113 6.64606 13.1864 6.90622 12.8838 6.92993C12.8684 6.93137 12.8538 6.93209 12.8384 6.93209Z" fill="currentColor" />
                    <path d="M12.8384 6.93209C12.5548 6.93209 12.3145 6.71865 12.2911 6.43693C12.2427 5.84618 11.8397 5.34743 11.266 5.1656C10.9766 5.07361 10.8184 4.76962 10.9114 4.48718C11.0059 4.20402 11.3129 4.05023 11.6031 4.13934C12.6017 4.45628 13.3014 5.32371 13.3872 6.34925C13.4113 6.64606 13.1864 6.90622 12.8838 6.92993C12.8684 6.93137 12.8538 6.93209 12.8384 6.93209" stroke="currentColor" strokeWidth="0.3" />
                  </svg>
                  Add Wishlist
                </button> */}
               
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

<Helmet>
<script type="module" src="/src/main.jsx"></script>
  <script data-cfasync="false" src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="/assets/js/vendor/jquery.js"></script>
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
  <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
crossorigin></script>

<script
src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
crossorigin></script>
</Helmet>
    </>
  )
}

export default Home