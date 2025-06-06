import React, { useEffect } from 'react'
import { BasePath, CartPath, WishlistPath } from '../../utils/Constants';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  useEffect(() => {
      window.scrollTo(0,0)
   
    
    }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    
    window.location.href = BasePath; 
  };
  return (
    <div>
<main>
  
  <section className="profile__area pt-120 pb-120">
    <div className="container">
      <div className="profile__inner p-relative">
        <div className="profile__shape">
          <img className="profile__shape-1" src="assets/img/login/laptop.png" alt />
          <img className="profile__shape-2" src="assets/img/login/man.png" alt />
          <img className="profile__shape-3" src="assets/img/login/shape-1.png" alt />
          <img className="profile__shape-4" src="assets/img/login/shape-2.png" alt />
          <img className="profile__shape-5" src="assets/img/login/shape-3.png" alt />
          <img className="profile__shape-6" src="assets/img/login/shape-4.png" alt />
        </div>
        <div className="row">
         
          <div className="col-xxl-12 col-lg-12">
            <div className="profile__tab-content">
              <div className="tab-content" id="profile-tabContent">
                <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div className="profile__main">
                    <div className="profile__main-top pb-80">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="profile__main-inner d-flex flex-wrap align-items-center">
                           
                            <div className="profile__main-content">
                              <h4 className="profile__main-title">Welcome  {localStorage.getItem('userName')}</h4>
                              <p>{localStorage.getItem("userEmail")}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile__main-logout text-sm-end">
                            <a onClick={handleLogout} className="tp-logout-btn">Logout</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile__main-info">
                      <div className="row gx-3">
                       
                        <div className="col-md-3 col-sm-6">
                          <div className="profile__main-info-item">
                            <div className="profile__main-info-icon">
                              <span>
                                <svg viewBox="0 0 512 512"><path d="M472.916,224H448.007a24.534,24.534,0,0,0-23.417-18H398V140.976a6.86,6.86,0,0,0-3.346-6.062L207.077,26.572a6.927,6.927,0,0,0-6.962,0L12.48,134.914A6.981,6.981,0,0,0,9,140.976V357.661a7,7,0,0,0,3.5,6.062L200.154,472.065a7,7,0,0,0,3.5.938,7.361,7.361,0,0,0,3.6-.938L306,415.108v41.174A29.642,29.642,0,0,0,335.891,486H472.916A29.807,29.807,0,0,0,503,456.282v-202.1A30.2,30.2,0,0,0,472.916,224Zm-48.077-4A10.161,10.161,0,0,1,435,230.161v.678A10.161,10.161,0,0,1,424.839,241H384.161A10.161,10.161,0,0,1,374,230.839v-.678A10.161,10.161,0,0,1,384.161,220ZM203.654,40.717l77.974,45.018L107.986,185.987,30.013,140.969ZM197,453.878,23,353.619V153.085L197,253.344Zm6.654-212.658-81.668-47.151L295.628,93.818,377.3,140.969ZM306,254.182V398.943l-95,54.935V253.344L384,153.085V206h.217A24.533,24.533,0,0,0,360.8,224H335.891A30.037,30.037,0,0,0,306,254.182Zm183,202.1A15.793,15.793,0,0,1,472.916,472H335.891A15.628,15.628,0,0,1,320,456.282v-202.1A16.022,16.022,0,0,1,335.891,238h25.182a23.944,23.944,0,0,0,23.144,17H424.59a23.942,23.942,0,0,0,23.143-17h25.183A16.186,16.186,0,0,1,489,254.182Z" /><path d="M343.949,325h7.327a7,7,0,1,0,0-14H351V292h19.307a6.739,6.739,0,0,0,6.655,4.727A7.019,7.019,0,0,0,384,289.743v-4.71A7.093,7.093,0,0,0,376.924,278H343.949A6.985,6.985,0,0,0,337,285.033v32.975A6.95,6.95,0,0,0,343.949,325Z" /><path d="M344,389h33a7,7,0,0,0,7-7V349a7,7,0,0,0-7-7H344a7,7,0,0,0-7,7v33A7,7,0,0,0,344,389Zm7-33h19v19H351Z" /><path d="M351.277,439H351V420h18.929a7.037,7.037,0,0,0,14.071.014v-6.745A7.3,7.3,0,0,0,376.924,406H343.949A7.191,7.191,0,0,0,337,413.269v32.975A6.752,6.752,0,0,0,343.949,453h7.328a7,7,0,1,0,0-14Z" /><path d="M393.041,286.592l-20.5,20.5-6.236-6.237a7,7,0,1,0-9.9,9.9l11.187,11.186a7,7,0,0,0,9.9,0l25.452-25.452a7,7,0,0,0-9.9-9.9Z" /><path d="M393.041,415.841l-20.5,20.5-6.236-6.237a7,7,0,1,0-9.9,9.9l11.187,11.186a7,7,0,0,0,9.9,0l25.452-25.452a7,7,0,0,0-9.9-9.9Z" /><path d="M464.857,295H420.891a7,7,0,0,0,0,14h43.966a7,7,0,0,0,0-14Z" /><path d="M464.857,359H420.891a7,7,0,0,0,0,14h43.966a7,7,0,0,0,0-14Z" /><path d="M464.857,423H420.891a7,7,0,0,0,0,14h43.966a7,7,0,0,0,0-14Z" /></svg>
                              </span>
                            </div>
                            <Link to={'/orders'}>
                            <h4 className="profile__main-info-title">Orders</h4>

                            </Link>


                           
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div className="profile__main-info-item">
                            <div className="profile__main-info-icon">
                              <span>
                                <svg viewBox="0 -20 480 480" xmlns="http://www.w3.org/2000/svg"><path d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0" /></svg>
                              </span>
                            </div>
                            <Link to={'/wishlist'}>
                            <h4 className="profile__main-info-title">Wishlist</h4>

                            </Link>
                          </div>
                        </div>
                    
                      </div>
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
  {/* profile area end */}
</main>


    </div>
  )
}

export default ProfilePage