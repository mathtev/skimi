import React from "react";
import { LevelsContext } from "../context/graphqlData/levels/LevelsProvider";

export const useLevels = () => {
  return React.useContext(LevelsContext);
}