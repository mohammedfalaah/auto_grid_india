import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BasePath, RegisterPath } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import { show_toast } from '../../utils/Toast';
import Axioscall from '../../services/Axioscall';
import { loginApi } from '../../services/BaseUrl';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          let body ={
            email,
            password,
          }
          const response = await Axioscall('post',loginApi,body);
          if (response.data.success) {
            show_toast("Logged in Successfully", true);

            const { name, id, email } = response.data.user;
            const { token } = response.data;
      
            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userId', id);
            localStorage.setItem('userEmail', email);
      
            // Redirect to BasePath
            window.location.href = BasePath;
          } 
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
      

      useEffect(() => {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUserName(JSON.parse(storedUser).name);
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
        }
      }, []);

   
  return (
    <>

<section className="breadcrumb__area include-bg text-center pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12"></div>
          </div>
        </div>
      </section>

      <section className="tp-login-area pb-140 p-relative z-index-1 fix">
        <div className="tp-login-shape">
          <img className="tp-login-shape-1" src="assets/img/login/login-shape-1.png" alt="" />
          <img className="tp-login-shape-2" src="assets/img/login/login-shape-2.png" alt="" />
          <img className="tp-login-shape-3" src="assets/img/login/login-shape-3.png" alt="" />
          <img className="tp-login-shape-4" src="assets/img/login/login-shape-4.png" alt="" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div style={{ border: '1px solid black', borderRadius: '10px' }} className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Welcome to Auto Grid India.</h3>
                  <p>
                    Don’t have an account?{' '}
                    <span>
                      <Link to={'/register'} >Create a free account</Link>
                    </span>
                  </p>
                </div>
                <div className="tp-login-option">
                  <form 
                  onSubmit={handleLogin}>
                    <div className="tp-login-input-wrapper">
                      <div className="tp-login-input-box">
                        <div className="tp-login-input">
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="tp-login-input-title">
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="tp-login-input-box">
                        <div className="tp-login-input">
                          <input
                            id="tp_password"
                            type="password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="tp-login-input-title">
                          <label htmlFor="tp_password">Password</label>
                        </div>
                      </div>
                    </div>

                    <div className="tp-login-bottom">
                      <button type="submit" className="tp-login-btn w-100">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default LoginPage
