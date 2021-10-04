import React from "react";
import { AppStateContext } from "../AppState";

export const useAppState = () => {
  return React.useContext(AppStateContext);
}