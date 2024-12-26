import React, { useEffect, useState } from 'react'
import Axioscall from '../../services/Axioscall'
import { getWishlistApi } from '../../services/BaseUrl'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])



  const getFavourite = async () => {
    try {
      const response = await Axioscall("get", getWishlistApi, "", "header");
      if (response.data?.success) {
        setWishlist(response.data.wishlistedProducts || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    getFavourite();
  }, [])
  

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
              <span><a href="#">Home</a></span>
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
                  <th colSpan={2} className="tp-cart-header-product">Product</th>
                  <th className="tp-cart-header-price">Price</th>
                  <th className="tp-cart-header-quantity">Quantity</th>
                  <th>Action</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item,index) => (
  <tr key={index}>
  {/* img */}
  <td className="tp-cart-img"><a href="product-details.html">
  <img
 src={`https://node.autogridnumberplate.com${item.photographs?.[0] || ""}`}                                  alt={item.productName}
                                />     </a></td>
  {/* title */}
  <td className="tp-cart-title">
                              <a href="#">{item.productName}</a>
                            </td> 
                             {/* price */}
                             <td className="tp-cart-price">
                              <span>₹{item.currentPrice}</span>
                            </td>  {/* quantity */}
  <td className="tp-cart-quantity">
    <div className="tp-product-quantity mt-10 mb-10">
      <span className="tp-cart-minus">
        <svg width={10} height={2} viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>                                                             
      </span>
      <input className="tp-cart-input" type="text" defaultValue={1} />
      <span className="tp-cart-plus">
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  </td>
  <td className="tp-cart-add-to-cart">
    <button type="submit" className="tp-btn tp-btn-2 tp-btn-blue">Add To Cart</button>
  </td>
  {/* action */}
  <td className="tp-cart-action">
    <button className="tp-cart-action-btn">
      <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z" fill="currentColor" />
      </svg>
      <span>Remove</span>
    </button>
  </td>
</tr>
                ))}
              

            
                
              
              </tbody>
            </table>
          </div>
          <div className="tp-cart-bottom">
            <div className="row align-items-end">
              <div className="col-xl-6 col-md-4">
                <div className="tp-cart-update">
                  <a href="cart.html" className="tp-cart-update-btn">Go To Cart</a>
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
  )
}

export default Wishlist