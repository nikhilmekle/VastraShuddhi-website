import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Partner from "./Components/pages/Partner";
import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Customer/Home";
import CustomerDashboard from "./Components/pages/Customer/CustomerDashboard";
import AdminDashboard from "./Components/pages/Admin/AdminDashboard";
import ShopOwnerDashboard from "./Components/pages/ShopOwner/ShopOwnerDashboard";
import { Toaster } from "react-hot-toast";
import AboutPage from "./Components/AboutPage";
import PublicHomePage from "./Components/PublicHomePage";
import { useState } from "react";
import { useAuth } from "./context/auth";
import Footer from "./Components/Footer";
import LoginShop from "./Components/pages/ShopOwner/LoginShop";
import NearbyShops from "./Components/pages/Customer/NearbyShops";

// Create a wrapper component that can use the location hook
const AppContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // Determine if the current path is a dashboard route.
  const hideNavFooter = location.pathname.includes("/dashboard");

  return (
    <>
      <Toaster />
      {!hideNavFooter && (
        <Navbar
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            auth && auth.customer ? (
              <Home />
            ) : (
              <PublicHomePage
                setDialogOpen={setDialogOpen}
                setIsLogin={setIsLogin}
              />
            )
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/partner"
          element={
            <Partner setDialogOpen={setDialogOpen} setIsLogin={setIsLogin} />
          }
        />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/shop/dashboard" element={<ShopOwnerDashboard />} />
        <Route path="/shop/login" element={<LoginShop />} />
        <Route path="/customer/nerabyshops" element={<NearbyShops />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
