import React from 'react'

const CheckOutPage = () => {
  return (
    <>
  <main>
  {/* breadcrumb area start */}
  <section className="breadcrumb__area include-bg pt-95 pb-50" data-bg-color="#EFF1F5">
    <div className="container">
      <div className="row">
        <div className="col-xxl-12">
          <div className="breadcrumb__content p-relative z-index-1">
            <h3 className="breadcrumb__title">Checkout</h3>
            <div className="breadcrumb__list">
              <span><a href="#">Home</a></span>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb area end */}
  {/* checkout area start */}
  <section className="tp-checkout-area pb-120" data-bg-color="#EFF1F5">
    <div className="container">
      <div className="row">
        
        <div className="col-lg-7">
          <div className="tp-checkout-bill-area">
            <h3 className="tp-checkout-bill-title">Billing Details</h3>
            <div className="tp-checkout-bill-form">
              <form action="#">
                <div className="tp-checkout-bill-inner">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="tp-checkout-input">
                        <label>First Name <span>*</span></label>
                        <input type="text" placeholder="First Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="tp-checkout-input">
                        <label>Last Name <span>*</span></label>
                        <input type="text" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Company name (optional)</label>
                        <input type="text" placeholder="Example LTD." />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Country / Region </label>
                        <input type="text" placeholder="India" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Street address</label>
                        <input type="text" placeholder="House number and street name" />
                      </div>
                      <div className="tp-checkout-input">
                        <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Town / City</label>
                        <input type="text" placeholder />
                      </div>
                    </div>
                   
                    <div className="col-md-6">
                      <div className="tp-checkout-input">
                        <label>Postcode ZIP</label>
                        <input type="text" placeholder />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Phone <span>*</span></label>
                        <input type="text" placeholder />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Email address <span>*</span></label>
                        <input type="email" placeholder />
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Order notes (optional)</label>
                        <textarea placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={""} />
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
                <li className="tp-order-info-list-desc">
                  <p>Xiaomi Redmi Note 9 Global V. <span> x 2</span></p>
                  <span>$274:00</span>
                </li>
                <li className="tp-order-info-list-desc">
                  <p>Office Chair Multifun <span> x 1</span></p>
                  <span>$74:00</span>
                </li>
                <li className="tp-order-info-list-desc">
                  <p>Apple Watch Series 6 Stainless  <span> x 3</span></p>
                  <span>$362:00</span>
                </li>
                <li className="tp-order-info-list-desc">
                  <p>Body Works Mens Collection <span> x 1</span></p>
                  <span>$145:00</span>
                </li>
                {/* subtotal */}
                <li className="tp-order-info-list-subtotal">
                  <span>Subtotal</span>
                  <span>$507.00</span>
                </li>
                {/* shipping */}
                <li className="tp-order-info-list-shipping">
                  <span>Shipping</span>
                  <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                    <span>
                      <input id="flat_rate" type="radio" name="shipping" />
                      <label htmlFor="flat_rate">Flat rate: <span>$20.00</span></label>
                    </span>
                    <span>
                      <input id="local_pickup" type="radio" name="shipping" />
                      <label htmlFor="local_pickup">Local pickup: <span>$25.00</span></label>
                    </span>
                    <span>
                      <input id="free_shipping" type="radio" name="shipping" />
                      <label htmlFor="free_shipping">Free shipping</label>
                    </span>
                  </div>
                </li>
                {/* total */}
                <li className="tp-order-info-list-total">
                  <span>Total</span>
                  <span>$1,476.00</span>
                </li>
              </ul>
            </div>
            <div className="tp-checkout-payment">
              <div className="tp-checkout-payment-item">
                <input type="radio" id="back_transfer" name="payment" />
                <label htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer">Direct Bank Transfer</label>
                <div className="tp-checkout-payment-desc direct-bank-transfer">
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
              </div>
              <div className="tp-checkout-payment-item">
                <input type="radio" id="cheque_payment" name="payment" />
                <label htmlFor="cheque_payment">Cheque Payment</label>
                <div className="tp-checkout-payment-desc cheque-payment">
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
              </div>
              <div className="tp-checkout-payment-item">
                <input type="radio" id="cod" name="payment" />
                <label htmlFor="cod">Cash on Delivery</label>
                <div className="tp-checkout-payment-desc cash-on-delivery">
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
              </div>
              <div className="tp-checkout-payment-item paypal-payment">
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">PayPal <img src="assets/img/icon/payment-option.png" alt /> <a href="#">What is PayPal?</a></label>
              </div>
            </div>
            <div className="tp-checkout-agree">
              <div className="tp-checkout-option">
                <input id="read_all" type="checkbox" />
                <label htmlFor="read_all">I have read and agree to the website.</label>
              </div>
            </div>
            <div className="tp-checkout-btn-wrapper">
              <a href="#" className="tp-checkout-btn w-100">Place Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* checkout area end */}
</main>

    </>
  )
}

export default CheckOutPage
