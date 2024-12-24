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

    </>
  )
}

export default App
