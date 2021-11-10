import React from "react";
import { LanguagesContext } from "../context/languages/LanguagesProvider";

export const useLanguages = () => {
  return React.useContext(LanguagesContext);
}