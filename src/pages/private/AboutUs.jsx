import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BasePath } from '../../utils/Constants'

const AboutUs = () => {
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
                  <h3 className="breadcrumb__title">About Us</h3>
                  <div className="breadcrumb__list">
                    <span><Link to={BasePath}>Home</Link></span>
                    <span>About Us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}

        {/* About Us area start */}
        <section className="about__area pb-100 pt-50">
          <div className="container tp-contact-inner">
            <div className="row ">
              <div className="col-xxl-12">
                <div className="about__content ">
                  <h2 className=" text-center">Welcome to AUTOGRIDINDIA</h2>
                  <p>
                    Your one-stop shop for premium car and bike number plates, car mirror hangings, and gel frames. Since 2022, we have been dedicated to offering products that not only enhance the look of your vehicle but also meet the highest standards of quality and durability.
                  </p>
                  <div className="about__features">
                    <ul className="about__list">
                      <li><strong>Premium Quality:</strong> We use only the best materials to ensure long-lasting and reliable products.</li>
                      <li><strong>Customization:</strong> Our products are fully customizable to match your personal style or specific requirements.</li>
                      <li><strong>Timely Delivery:</strong> We understand the importance of your time, so we ensure fast and efficient delivery of every order.</li>
                      <li><strong>Customer Satisfaction:</strong> Our customers are at the heart of everything we do, and we strive to exceed expectations with every interaction.</li>
                    </ul>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="row mt-50">
              <div className="col-md-6">
                <div className="mission__content">
                  <h3 className="mission__title">Our Mission</h3>
                  <p>
                    To provide premium, customizable, and innovative products for vehicles while ensuring unmatched customer satisfaction.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="vision__content">
                  <h3 className="vision__title">Our Vision</h3>
                  <p>
                    To become a global leader in premium automotive accessories, recognized for quality, innovation, and customer focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About Us area end */}

        {/* Mission and Vision area start */}
      
        {/* Mission and Vision area end */}
      </main>
    </>
  )
}

export default AboutUs
