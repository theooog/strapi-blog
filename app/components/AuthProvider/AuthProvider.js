"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "../../helpers/helpers";
import { AuthContext } from "../../context/AuthContext";
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const authToken = getToken();

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    const fetchLoggedInUser = async (token) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) {
      fetchLoggedInUser(authToken);
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, isLoading, setUser: handleUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
