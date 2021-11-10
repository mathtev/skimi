import { useQuery } from '@apollo/client';
import React, { createContext } from 'react';
import { GET_ALL_LANGUAGES } from '../../graphql/language/queries';
import { Language, Languages } from '../../graphql/language/types';


interface ILanguagesContext {
  data: Language[];
  loading: boolean;
  refetch?: (variables?: any) => Promise<any>;
}

export const LanguagesContext = createContext<ILanguagesContext>({
  data: [],
  loading: false,
  refetch: undefined,
});

const LanguagesProvider: React.FC = ({ children }) => {
  const { data, loading, refetch } = useQuery<Languages>(GET_ALL_LANGUAGES);
  const languages =  data?.languages || [];

  return (
    <LanguagesContext.Provider value={{ data: languages, loading, refetch }}>
      {children}
    </LanguagesContext.Provider>
  );
};

export default LanguagesProvider;
