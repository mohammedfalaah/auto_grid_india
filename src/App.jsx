import { Route, Routes } from "react-router-dom"
import Home from "./pages/private/Home"
import Header from "./layouts/Header"
import { BasePath, CartPath, LoginPath, ProductsPath, ProfilePath, RegisterPath, WishlistPath } from "./utils/Constants"
import Wishlist from "./pages/private/Wishlist"
import ProfilePage from "./pages/private/ProfilePage"
import ProductPage from "./pages/private/ProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/private/LoginPage"
import RegisterPage from "./pages/private/RegisterPage"
import { Helmet } from "react-helmet"



function App() {
  return (
    <>
    <Routes>
    <Route path={BasePath} element={<Home />} />
    <Route path={WishlistPath} element={<Wishlist />} />
    <Route path={ProfilePath} element={<ProfilePage />} />
    <Route path={ProductsPath} element={<ProductPage />} />
    <Route path={CartPath} element={<CartPage />} />
    <Route path={LoginPath} element={<LoginPage />} />
    <Route path={RegisterPath} element={<RegisterPage />} />
    </Routes>
    <Helmet>
    <script type="module" src="/src/main.jsx"></script>
    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
    <script data-cfasync="false" src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="/assets/js/vendor/jquery.js"></script>
    <script src="/assets/js/vendor/waypoints.js"></script>
    <script src="/assets/js/bootstrap-bundle.js"></script>
    <script src="/assets/js/meanmenu.js"></script>
    <script src="/assets/js/swiper-bundle.js"></script>
    <script src="/assets/js/slick.js"></script>
    <script src="/assets/js/range-slider.js"></script>
    <script src="/assets/js/magnific-popup.js"></script>
    <script src="/assets/js/nice-select.js"></script>
    <script src="/assets/js/purecounter.js"></script>
    <script src="/assets/js/countdown.js"></script>
    <script src="/assets/js/wow.js"></script>
    <script src="/assets/js/isotope-pkgd.js"></script>
    <script src="/assets/js/imagesloaded-pkgd.js"></script>
    <script src="/assets/js/ajax-form.js"></script>
    <script src="/assets/js/main.js"></script>
    
    </Helmet>

    </>
  )
}

export default App
