import React from "react";
import { SkillContext } from "../context/graphqlData/skill/SkillProvider";

export const useSkill = () => {
  return React.useContext(SkillContext);
}