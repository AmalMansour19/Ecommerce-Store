
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Product-Details/ProductDetails";
import Wishlist from "../pages/WishList/Wishlist";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import SearchPage from "../pages/Search/SearchPage";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ darkMode, setDarkMode }) {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col">
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />

                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/search" element={<SearchPage />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Route>

                        <Route path="/cart" element={<Cart />} />

                        <Route
                            path="*"
                            element={
                                <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
                                    <h1 className="text-4xl font-semibold">404</h1>
                                    <p className="mt-3 text-neutral-500">
                                        Sorry, this page could not be found.
                                    </p>
                                </div>
                            }
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRoutes;
