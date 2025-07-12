import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [shopAuth, setShopAuth] = useState({
    shop: null,
    token: "",
  });

  // Set default axios authorization header
  axios.defaults.headers.common["Authorization"] = shopAuth?.token;

  useEffect(() => {
    const data = localStorage.getItem("shopAuth");
    if (data) {
      const parseData = JSON.parse(data);
      setShopAuth({
        shop: parseData.shop, // ✅ Corrected from 'shop_Owner' to 'shop'
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[shopAuth, setShopAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
