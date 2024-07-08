import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomImage from "./components/WelcomImage";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CardCarousel from "./components/CardCarousel";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import CalendarEvents from "./components/CalendarEvents";
import GuideProfile from "./components/GuideProfile";
import TravelWithUs from "./components/TravelWithUs";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import UserCrud from "./components/UserCrud";
import ProductCrud from "./components/ProductCrud";
import { useEffect } from "react";
import { setAuthToken } from "./axiosInstance";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/usercrud" element={<UserCrud />} />
          <Route path="/productcrud" element={<ProductCrud />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<CalendarEvents />} />
          <Route path="/guideprofile" element={<GuideProfile />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/packages" element={<ProductList />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guidetrip" element={<TravelWithUs />} />
          <Route
            path="/"
            element={
              <>
                <WelcomImage />
                <CardCarousel />
                <TravelWithUs />
                <Gallery />
                <Testimonials />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
