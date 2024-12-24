import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginPath } from "../../utils/Constants";
import { show_toast } from "../../utils/Toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://aginode.vercel.app/api/signup",
        new URLSearchParams(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.success) {
        show_toast("Registration Successfully", true);
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
        
      } else {
        show_toast(response.data.message || "Registration failed.", false);      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <main>
        {/* breadcrumb area start */}
        <section className="breadcrumb__area include-bg text-center pt-95 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Register Now</h3>
                  <div className="breadcrumb__list">
                    <span>
                      <Link to="/">Home</Link>
                    </span>
                    <span>Register</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb area end */}
        {/* login area start */}
        <section className="tp-login-area pb-140 p-relative z-index-1 fix">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="tp-login-wrapper">
                  <div className="tp-login-top text-center mb-30">
                    <h3 className="tp-login-title">Sign Up Auto Grid India</h3>
                    <p>
                      Already have an account?{" "}
                      <span>
                        <Link to="/login">Sign In</Link>
                      </span>
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="tp-login-input-wrapper">
                      <div className="tp-login-input-box">
                        <div className="tp-login-input">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="tp-login-input-title">
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="tp-login-input-box">
                        <div className="tp-login-input">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="tp-login-input-title">
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="tp-login-input-box">
                        <div className="tp-login-input">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Min. 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="tp-login-input-title">
                          <label htmlFor="password">Password</label>
                        </div>
                      </div>
                    </div>
                    <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
                      <div className="tp-login-remeber">
                        <input id="remeber" type="checkbox" required />
                        <label htmlFor="remeber">
                          I accept the terms of the Service &{" "}
                          <Link to="#">Privacy Policy</Link>.
                        </label>
                      </div>
                    </div>
                    <div className="tp-login-bottom">
                      <button type="submit" className="tp-login-btn w-100">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* login area end */}
      </main>
    </>
  );
};

export default RegisterPage;
