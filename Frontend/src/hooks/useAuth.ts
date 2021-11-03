import React from "react";
import { AuthContext } from "../context/auth/AuthProvider";

export const useAuth = () => {
  return React.useContext(AuthContext);
}