import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BasePath } from '../../utils/Constants'

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main>
        {/* breadcrumb area start */}
        <section className="breadcrumb__area include-bg text-center pt-35 pb-15">
          <div className="container ">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Privacy Policy</h3>
                  <div className="breadcrumb__list">
                    <span><Link to={BasePath}>Home</Link></span>
                    <span>Privacy Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}

        {/* Privacy Policy Content Start */}
        <section className="privacy-policy-area pb-100 pt-50">
          <div className="container tp-contact-inner">
            <div className="row">
              <div className="col-xxl-12">
                <div className="privacy-policy-content">
                  <h2 className="privacy-policy-title text-center">Our Privacy Policy</h2>
                  <p>
                    At <strong>AUTOGRIDINDIA</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how it is used, and your rights regarding your data.
                  </p>

                  <h3 className="privacy-policy-subtitle">1. Information We Collect</h3>
                  <p>We may collect the following types of information:</p>
                  <ul className="privacy-policy-list">
                    <li>Personal information, such as your name, email address, phone number, and shipping address.</li>
                    <li>Payment details for processing transactions (secured and encrypted).</li>
                    <li>Behavioral data, such as your browsing history, preferences, and feedback.</li>
                  </ul>

                  <h3 className="privacy-policy-subtitle">2. How We Use Your Information</h3>
                  <p>Your information is used for the following purposes:</p>
                  <ul className="privacy-policy-list">
                    <li>To process and fulfill your orders efficiently.</li>
                    <li>To improve our products, services, and user experience.</li>
                    <li>To send promotional offers, updates, and marketing communications (with your consent).</li>
                  </ul>

                  <h3 className="privacy-policy-subtitle">3. Data Sharing and Security</h3>
                  <p>We ensure your data is protected and only shared under the following circumstances:</p>
                  <ul className="privacy-policy-list">
                    <li>With trusted third-party services for payment processing and delivery logistics.</li>
                    <li>When required by law or to protect our legal rights.</li>
                  </ul>
                  <p>
                    We use industry-standard encryption and security measures to safeguard your data from unauthorized access.
                  </p>

                  <h3 className="privacy-policy-subtitle">4. Your Rights</h3>
                  <p>As a user, you have the following rights:</p>
                  <ul className="privacy-policy-list">
                    <li>Access: You can request access to the personal data we hold about you.</li>
                    <li>Correction: You can request corrections to any inaccurate or incomplete data.</li>
                    <li>Deletion: You can request the deletion of your personal data, subject to legal requirements.</li>
                  </ul>

                  <h3 className="privacy-policy-subtitle">5. Cookies</h3>
                  <p>
                    Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us analyze website traffic and improve our services. You can choose to disable cookies through your browser settings.
                  </p>

                  <h3 className="privacy-policy-subtitle">6. Changes to This Policy</h3>
                  <p>
                    We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
                  </p>

                  <h3 className="privacy-policy-subtitle">7. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
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
        {/* Privacy Policy Content End */}
      </main>
    </>
  )
}

export default PrivacyPolicy
