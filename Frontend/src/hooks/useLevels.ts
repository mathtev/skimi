import React from "react";
import { LevelsContext } from "../context/levels/LevelsProvider";

export const useLevels = () => {
  return React.useContext(LevelsContext);
}