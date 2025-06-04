import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get("/me");
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};