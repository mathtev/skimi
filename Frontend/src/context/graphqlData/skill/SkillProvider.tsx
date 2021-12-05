import { FetchResult, useMutation } from '@apollo/client';
import React, { createContext } from 'react';
import { Language } from '../../../graphql/language/types';
import { UPDATE_TRANSLATION_SET } from '../../../graphql/translationSet/mutations';
import { TranslationSet } from '../../../graphql/translationSet/types';

// prettier-ignore
interface ISkillContext {
  skillUp?: (translationSet: TranslationSet, value: number) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>> | undefined;
  skillDown?: (translationSet: TranslationSet, value: number) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>> | undefined;
}

export const SkillContext = createContext<ISkillContext>({
  skillUp: undefined,
  skillDown: undefined,
});

interface SkillProviderProps {
  languageFrom: string;
  languageTo: string;
}

const SkillProvider: React.FC = ({ children }) => {
  const [translationSetUpdateMutation] = useMutation(UPDATE_TRANSLATION_SET);

  const updateSkill = (id: number, skill: number) => {
    return translationSetUpdateMutation({
      variables: { id, input: { skill } },
    });
  };

  const skillDown = (translationSet: TranslationSet, value: number) => {
    let skill = translationSet.skill;
    if (skill === undefined || skill <= 0) return;
    skill -= value;
    if (skill < 0) skill = 0;
    return updateSkill(translationSet.id, skill);
  };

  const skillUp = (translationSet: TranslationSet, value: number) => {
    let skill = translationSet.skill;
    if (skill === undefined || skill >= 100) return;
    skill += value;
    if (skill > 100) skill = 100;
    return updateSkill(translationSet.id, skill);
  };

  return (
    <SkillContext.Provider value={{ skillUp, skillDown }}>
      {children}
    </SkillContext.Provider>
  );
};

export default SkillProvider;
