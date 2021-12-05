import React from "react";
import { LanguagesContext } from "../context/graphqlData/languages/LanguagesProvider";

export const useLanguages = () => {
  return React.useContext(LanguagesContext);
}