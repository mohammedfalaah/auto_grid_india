import { Route, Routes } from "react-router-dom"
import Home from "./pages/private/Home"
import Header from "./layouts/Header"
import { BasePath, ProfilePath, WishlistPath } from "./utils/Constants"
import Wishlist from "./pages/private/Wishlist"
import ProfilePage from "./pages/private/ProfilePage"



function App() {
  return (
    <>
    <Routes>
    <Route path={BasePath} element={<Home />} />
    <Route path={WishlistPath} element={<Wishlist />} />
    <Route path={ProfilePath} element={<ProfilePage />} />

    </Routes>

    </>
  )
}

export default App
