import { useQuery } from '@apollo/client';
import React, { createContext } from 'react';
import { isNullOrUndefined } from 'util';
import { GET_ALL_LANGUAGES } from '../../graphql/language/queries';
import { Language, Languages } from '../../graphql/language/types';
import { useSettings } from '../../hooks/useSettings';
import { compareStrings } from '../../utils/helperFunctions';

interface ILanguagesContext {
  languages: Language[];
  languageFrom?: Language;
  languageTo?: Language;
}

export const LanguagesContext = createContext<ILanguagesContext>({
  languages: [],
  languageFrom: undefined,
  languageTo: undefined,
});

interface LanguagesProviderProps {
  languageFrom: string;
  languageTo: string;
}

const LanguagesProvider: React.FC = ({ children }) => {
  const { nativeLanguage, learningLanguage } = useSettings();
  const { data, loading, refetch } = useQuery<Languages>(GET_ALL_LANGUAGES);
  const languages = data?.languages || [];

  const languageFrom = languages.find((language) =>
    compareStrings(language.name, nativeLanguage)
  );

  const languageTo = languages.find((language) =>
    compareStrings(language.name, learningLanguage)
  );

  return (
    <LanguagesContext.Provider value={{ languages, languageFrom, languageTo }}>
      {children}
    </LanguagesContext.Provider>
  );
};

export default LanguagesProvider;
