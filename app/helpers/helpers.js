import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("authToken");
};

export const setToken = (token) => {
  if (token) {
    Cookies.set("authToken", token, { expires: 7 }); // The token expires after 7 days
  }
};

export const removeToken = () => {
  Cookies.remove("authToken");
};
