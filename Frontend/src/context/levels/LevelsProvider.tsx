import { useQuery } from '@apollo/client';
import React, { createContext, useState } from 'react';
import { GET_ALL_LEVELS } from '../../graphql/level/queries';
import { Level, Levels } from '../../graphql/level/types';

interface ILevelsContext {
  data: Level[];
  loading: boolean;
  refetch?: (variables?: any) => Promise<any>;
}

export const LevelsContext = createContext<ILevelsContext>({
  data: [],
  loading: false,
  refetch: undefined,
});

const LevelsProvider: React.FC = ({ children }) => {
  const { data, loading, refetch } = useQuery<Levels>(GET_ALL_LEVELS);
  const levels =  data?.levels || [];

  return (
    <LevelsContext.Provider
      value={{ data: levels, loading, refetch }}
    >
      {children}
    </LevelsContext.Provider>
  );
};

export default LevelsProvider;
