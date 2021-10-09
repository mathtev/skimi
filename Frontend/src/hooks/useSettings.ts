import React from "react";
import { SettingsContext } from "../context/settings/SettingsProvider";

export const useSettings = () => {
  return React.useContext(SettingsContext);
}