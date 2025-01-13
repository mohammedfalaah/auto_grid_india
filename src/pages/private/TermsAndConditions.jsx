import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BasePath } from '../../utils/Constants'

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main>
        {/* breadcrumb area start */}
        <section className="breadcrumb__area include-bg text-center pt-35 pb-15">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Terms and Conditions</h3>
                  <div className="breadcrumb__list">
                    <span><Link to={BasePath}>Home</Link></span>
                    <span>Terms and Conditions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}

        {/* Terms and Conditions Content Start */}
        <section className="terms-conditions-area pb-100 pt-50">
          <div className="container tp-contact-inner">
            <div className="row">
              <div className="col-xxl-12">
                <div className="terms-conditions-content">
                  <h2 className="terms-conditions-title text-center">Terms and Conditions</h2>
                  <p>
                    Welcome to <strong>AUTOGRIDINDIA</strong>. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
                  </p>

                  <h3 className="terms-conditions-subtitle">1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, you should not use our website.
                  </p>

                  <h3 className="terms-conditions-subtitle">2. Use of Services</h3>
                  <p>
                    You agree to use our website and services only for lawful purposes. You must not:
                    Violate any applicable laws or regulations.
                    Transmit any harmful or disruptive code (e.g., viruses).
                    Engage in fraudulent or deceptive activities.
                  </p>
                  
                  

                  <h3 className="terms-conditions-subtitle">3. Intellectual Property</h3>
                  <p>
                    All content on this website, including text, graphics, logos, and images, is the property of <strong>AUTOGRIDINDIA</strong> and is protected by copyright, trademark, and other intellectual property laws. You may not use or reproduce any content without prior written consent.
                  </p>

                  <h3 className="terms-conditions-subtitle">4. Pricing and Payments</h3>
                  <p>
                    All prices displayed on our website are subject to change without notice. Payments must be made in full at the time of purchase. We reserve the right to cancel or refuse any order at our discretion.
                  </p>

                  <h3 className="terms-conditions-subtitle">5. Shipping and Delivery</h3>
                  <p>
                    We aim to deliver your orders promptly. However, delivery times may vary based on location and unforeseen circumstances. We are not liable for delays caused by third-party couriers or force majeure events.
                  </p>

                  <h3 className="terms-conditions-subtitle">6. Returns and Refunds</h3>
                  <p>
                    If you are not satisfied with your purchase, you may request a return or refund in accordance with our <Link to="/return-policy">Return Policy</Link>. Refunds will be processed only if the product meets the return criteria.
                  </p>

                  <h3 className="terms-conditions-subtitle">7. Limitation of Liability</h3>
                  <p>
                    We are not responsible for any damages resulting from your use of our website or services. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
                  </p>

                  <h3 className="terms-conditions-subtitle">8. Changes to Terms</h3>
                  <p>
                    We reserve the right to update or modify these terms at any time without prior notice. Continued use of our website following such changes constitutes your acceptance of the updated terms.
                  </p>

                  <h3 className="terms-conditions-subtitle">9. Governing Law</h3>
                  <p>
                    These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Your City/State].
                  </p>

                  <h3 className="terms-conditions-subtitle">10. Contact Information</h3>
                  <p>
                    If you have any questions about these terms, please contact us at:
                  </p>
                  <p>
                    Email: <a href="mailto:autogridindia1@gmail.com">autogridindia1@gmail.com</a><br />
                    Phone: <a href="tel:+919961123654">+91 996 11 23654</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Terms and Conditions Content End */}
      </main>
    </>
  )
}

export default TermsAndConditions
