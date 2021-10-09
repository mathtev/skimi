import React from "react";
import { AppStateContext } from "../context/appState/AppStateProvider";

export const useAppState = () => {
  return React.useContext(AppStateContext);
}