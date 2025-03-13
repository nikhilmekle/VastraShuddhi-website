import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(); // Make sure to use correct capitalization for consistency

const AuthProvider = ({ children }) => {
  // Change 'Children' to 'children'
  const [auth, setAuth] = useState({
    customer: null,
    token: "", // Initialize token as an empty string
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        customer: parseData.customer,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children} {/* Render the children prop */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
