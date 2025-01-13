import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BasePath } from '../../utils/Constants'

const ContactUs = () => {

  useEffect(() => {
    window.scrollTo(0,0)
 
  
  }, [])

  return (
    <>
<main>
  {/* breadcrumb area start */}
  <section className="breadcrumb__area include-bg text-center pt-95 pb-50">
    <div className="container">
      <div className="row">
        <div className="col-xxl-12">
          <div className="breadcrumb__content p-relative z-index-1">
            <h3 className="breadcrumb__title">Keep In Touch with Us</h3>
            <div className="breadcrumb__list">
              <span><Link to={BasePath}>Home</Link></span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb area end */}
  {/* contact area start */}
  <section className="tp-contact-area pb-100">
    <div className="container">
      <div className="tp-contact-inner">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tp-contact-wrapper">
              <h3 className="tp-contact-title">Sent A Message</h3>
              <div className="tp-contact-form">
  <form id="contact-form"  method="POST" onSubmit={(e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    alert('Your message has been submitted successfully!');
  }}>
    <div className="tp-contact-input-wrapper">
      <div className="tp-contact-input-box">
        <div className="tp-contact-input">
          <input name="name" id="name" type="text" placeholder="name" required />
        </div>
        <div className="tp-contact-input-title">
          <label htmlFor="name">Your Name</label>
        </div>
      </div>
      <div className="tp-contact-input-box">
        <div className="tp-contact-input">
          <input name="email" id="email" type="email" placeholder="example@example.com" required />
        </div>
        <div className="tp-contact-input-title">
          <label htmlFor="email">Your Email</label>
        </div>
      </div>
      <div className="tp-contact-input-box">
        <div className="tp-contact-input">
          <input name="subject" id="subject" type="text" placeholder="Write your subject" required />
        </div>
        <div className="tp-contact-input-title">
          <label htmlFor="subject">Subject</label>
        </div>
      </div>
      <div className="tp-contact-input-box">
        <div className="tp-contact-input">
          <textarea id="message" name="message" placeholder="Write your message here..." required />
        </div>
        <div className="tp-contact-input-title">
          <label htmlFor="message">Your Message</label>
        </div>
      </div>
    </div>
    <div className="tp-contact-suggetions mb-20">
      <div className="tp-contact-remeber">
        <input id="remeber" type="checkbox" />
        <label htmlFor="remeber">Save my name, email, and website in this browser for the next time I comment.</label>
      </div>
    </div>
    <div className="tp-contact-btn">
      <button type="submit">Send Message</button>
    </div>
  </form>
  <p className="ajax-response" />
</div>

            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="tp-contact-info-wrapper">
              <div className="tp-contact-info-item">
                <div className="tp-contact-info-icon">
                  <span>
                    <img src="assets/img/contact/contact-icon-1.png" alt />
                  </span>
                </div>
                <div className="tp-contact-info-content">
                  <p data-info="mail"><a href="mailto:autogridindia1@gmail.com">autogridindia1@gmail.com</a></p>
                  <p data-info="phone"><a href="tel:+91 996 11 23654">+91 996 11 23654</a></p>
                </div>
              </div>
              <div className="tp-contact-info-item">
                <div className="tp-contact-info-icon">
                  <span>
                    <img src="assets/img/contact/contact-icon-2.png" alt />
                  </span>
                </div>
                <div className="tp-contact-info-content">
                  <p>
                    
                    <a href="https://maps.apple.com/?address=Tirur%20Malappuram%20Manjeri%20Road,%20Down%20Hill,%20Malappuram,%20676505,%20Kerala,%20India&ll=11.040257,76.068947&q=Tirur%20Malappuram%20Manjeri%20Road&t=m" target="_blank">
                      Paravath Building. <br /> Mylappuram, Malappuram 676519
                    </a>
                  </p>
                </div>
              </div>
              <div className="tp-contact-info-item">
                <div className="tp-contact-info-icon">
                  <span>
                    <img src="assets/img/contact/contact-icon-3.png" alt />
                  </span>
                </div>
                <div className="tp-contact-info-content">
                  <div className="tp-contact-social-wrapper mt-5">
                    <h4 className="tp-contact-social-title">Find on social media</h4>
                    <div className="tp-contact-social-icon">
                      <a href="https://www.facebook.com/share/19fc7Tjb6E/?mibextid=wwXIfr"><i className="fa-brands fa-facebook-f" /></a>
                      <a href="https://www.instagram.com/autogridindia?igsh=MWRhZTUxbG1peDVobQ=="><i className="fa-brands fa-instagram" /></a>
                      <a href="https://wa.me/919961123654"><i className="fa-brands fa-whatsapp" /></a>
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
  {/* contact area end */}
  {/* map area start */}

  {/* map area end */}
</main>

    </>
  )
}

export default ContactUs
