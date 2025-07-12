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
import ServiceRequest from "./Components/pages/Customer/ServiceRequest";
import MyServiceRequests from "./Components/pages/Customer/MyServiceRequests";
import CustomerOrders from "./Components/pages/Customer/CustomerOrders";
import OrderDetails from "./Components/pages/Customer/OrderDetails";
import HomePage from "./Components/pages/ShopOwner/HomePage";
import RequestPage from "./Components/pages/ShopOwner/RequestPage";
import RecentPayments from "./Components/pages/Customer/ResentPaymtnts";
import Notifications from "./Components/pages/Notifications";

const AppContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [auth] = useAuth();
  const location = useLocation();

  // Hide nav/footer on dashboard layouts
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
        {/* Public Routes */}
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

        {/* Customer Dashboard & Nested Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />}>
          <Route
            index
            element={
              <h2 style={{ textAlign: "center" }}>Welcome to your Dashboard</h2>
            }
          />
          <Route path="requests" element={<MyServiceRequests />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="Payments" element={<RecentPayments />} />
          <Route
            path="notifications"
            element={<Notifications type="Customer" />}
          />
        </Route>

        {/* Other Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/shop/dashboard" element={<ShopOwnerDashboard />} />
        <Route path="/shop/login" element={<LoginShop />} />
        <Route path="/customer/nerabyshops" element={<NearbyShops />} />
        <Route path="/customer/servicerequest" element={<ServiceRequest />} />
        <Route path="/customer/orders-details" element={<OrderDetails />} />
        <Route path="/shop/dashboard/home" element={<HomePage />} />
        <Route path="/shop/dashboard/requests" element={<RequestPage />} />
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
