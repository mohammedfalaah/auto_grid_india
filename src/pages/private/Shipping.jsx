import React from 'react'
import { Link } from 'react-router-dom'
import { BasePath } from '../../utils/Constants'

const Shipping = () => {
  return (
    <>
      <main>
  {/* breadcrumb area start */}
  <section className="breadcrumb__area include-bg text-center pt-35 pb-15">
    <div className="container">
      <div className="row">
        <div className="col-xxl-12">
          <div className="breadcrumb__content p-relative z-index-1">
            <h3 className="breadcrumb__title">Shipping Policy</h3>
            <div className="breadcrumb__list">
              <span><Link to={BasePath}>Home</Link></span>
              <span>Shipping Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb area end */}

  {/* Shipping Policy area start */}
  <section className="shipping__area pb-100 pt-50">
    <div className="container tp-contact-inner">
      <div className="row">
        <div className="col-xxl-12">
          <div className="shipping__content">
            <h2 className="text-center">Shipping Policy</h2>
            <p>
              At AUTOGRIDINDIA, we are committed to providing transparent and efficient shipping services. Please review the details of our shipping policies below.
            </p>

            <div className="shipping__details">
              <h3>1. General</h3>
              <p>
                We strive to maintain accurate stock counts on our website. However, there may be instances of stock discrepancies. If we cannot fulfill your entire order:
              </p>
              <ul className="shipping__list">
                <li>We will dispatch the available items immediately.</li>
                <li>We will contact you regarding back-ordered items to decide between waiting for restocking or receiving a refund.</li>
              </ul>

              <h3>2. Shipping Costs</h3>
              <ul className="shipping__list">
                <li>Free shipping across India.</li>
                <li>
                  For international orders, contact our customer care at <a href="mailto:autogridindia1@gmail.com">autogridindia1@gmail.com</a> to confirm shipping charges for your destination.
                </li>
              </ul>

              <h3>3. Delivery Terms</h3>
              <h4>3.1 Transit Time Domestically</h4>
              <p>Domestic shipments are typically in transit for 4–10 days.</p>

              <h4>3.2 Transit Time Internationally</h4>
              <p>
                International shipments usually take 4–22 days, depending on the delivery location. Contact us for specific estimates.
              </p>

              <h4>3.3 Dispatch Time</h4>
              <p>
                Orders are dispatched within 4 business days of payment confirmation. Our warehouse operates Monday–Friday, excluding national holidays. Customized products may require additional processing time.
              </p>

              <h4>3.4 Change of Delivery Address</h4>
              <p>You may request an address change any time before the order has been dispatched.</p>

              <h4>3.5 P.O. Box Shipping</h4>
              <p>Orders shipped to P.O. boxes will be delivered using DTDC Courier services.</p>

              <h4>3.6 Items Out of Stock</h4>
              <p>
                If an item is out of stock, in-stock items will be shipped immediately, and the remaining items will be dispatched once restocked.
              </p>

              <h4>3.7 Delivery Time Exceeded</h4>
              <p>If delivery exceeds the estimated time, please contact us for assistance.</p>

              <h3>4. Tracking Notifications</h3>
              <p>
                Once dispatched, a tracking ID will be provided to monitor your shipment’s progress via the courier’s updates.
              </p>

              <h3>5. Parcels Damaged in Transit</h3>
              <p>
                If your parcel is damaged, reject it from the courier and notify our customer service. If delivered in your absence, contact us for further assistance.
              </p>

              <h3>6. Duties & Taxes</h3>
              <h4>6.1 Sales Tax</h4>
              <p>Sales tax is included in the displayed price of goods.</p>

              <h4>6.2 Import Duties & Taxes</h4>
              <p>
                International shipments may be subject to import duties and taxes upon arrival. These costs are the customer's responsibility. If refused, goods will be returned at your expense, and no refund will be issued.
              </p>

              <h3>7. Cancellations</h3>
              <p>
                Orders can be canceled before dispatch. Customized products are not eligible for cancellation.
              </p>

              <h3>8. Insurance</h3>
              <p>
                Parcels are insured for loss or damage up to the value stated by the courier.
              </p>

              <h3>9. Claims for Lost or Damaged Parcels</h3>
              <h4>9.1 Damaged in Transit</h4>
              <p>
                Refunds or replacements will be processed after the courier's investigation is completed.
              </p>

              <h4>9.2 Lost in Transit</h4>
              <p>
                Refunds or replacements will be issued once the courier confirms the parcel is lost.
              </p>

              <h3>10. Customer Service</h3>
              <p>
                For assistance, email us at <a href="mailto:autogridindia1@gmail.com">autogridindia1@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Shipping Policy area end */}
</main>

    </>
  )
}

export default Shipping
