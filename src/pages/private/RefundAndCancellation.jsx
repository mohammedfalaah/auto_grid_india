import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BasePath } from '../../utils/Constants';

const RefundAndCancellation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        {/* breadcrumb area start */}
        <section className="breadcrumb__area include-bg text-center pt-35 pb-15">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Refund and Cancellation Policy</h3>
                  <div className="breadcrumb__list">
                    <span><Link to={BasePath}>Home</Link></span>
                    <span>Refund and Cancellation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}

        {/* Refund and Cancellation area start */}
        <section className="refund__area pb-100 pt-50">
          <div className="container tp-contact-inner">
            <div className="row">
              <div className="col-xxl-12">
                <div className="refund__content">
                  <h2 className="text-center">Refund and Cancellation Policy</h2>
                  <p>
                    At AUTOGRIDINDIA, we strive to ensure your satisfaction with every purchase. If you are not completely happy with your order, please review our refund and cancellation policies below.
                  </p>

                  <div className="refund__details">
                    <h3>Refund Policy</h3>
                    <ul className="refund__list">
                      <li>
                        Refunds are applicable only for defective or damaged products. If you receive a defective product, you must notify us within 7 days of receipt.
                      </li>
                      <li>
                        To initiate a refund, please contact our support team at <a href="mailto:autogridindia1@gmail.com">autogridindia1@gmail.com</a> or call us at <a href="tel:+919961123654">+91 996 11 23654</a>.
                      </li>
                      <li>
                        Refunds will be processed within 5-7 business days after approval and credited to your original payment method.
                      </li>
                    </ul>

                    <h3>Cancellation Policy</h3>
                    <ul className="refund__list">
                      <li>
                        Orders can be canceled within 24 hours of placement by contacting our support team.
                      </li>
                      <li>
                        If the order has already been shipped, cancellations will not be possible. You may request a return or refund under our refund policy instead.
                      </li>
                    </ul>

                    <h3>Important Notes</h3>
                    <ul className="refund__list">
                      <li>
                        Customized or personalized products are not eligible for refunds or cancellations unless they are defective or damaged.
                      </li>
                      <li>
                        Shipping charges are non-refundable, except in cases where the issue was due to our error.
                      </li>
                      <li>
                        For any additional questions, feel free to reach out to us via email or phone.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Refund and Cancellation area end */}
      </main>
    </>
  );
};

export default RefundAndCancellation;