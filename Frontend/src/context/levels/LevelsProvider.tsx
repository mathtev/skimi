import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import React, { createContext, useState } from 'react';
import { GET_ALL_LEVELS, GET_USER_LEVEL } from '../../graphql/level/queries';
import { Level, Levels } from '../../graphql/level/types';

interface ILevelsContext {
  levels: Level[];
  userLevel?: Level;
}

export const LevelsContext = createContext<ILevelsContext>({
  levels: [],
  userLevel: undefined
});

const LevelsProvider: React.FC = ({ children }) => {
  const levelsQuery = useQuery<Levels>(GET_ALL_LEVELS);
  const userLevelQuery = useQuery(GET_USER_LEVEL)

  const levels = levelsQuery.data?.levels || [];
  const userLevel = userLevelQuery.data?.getUserLevel;
  return (
    <LevelsContext.Provider value={{ levels, userLevel }}>
      {children}
    </LevelsContext.Provider>
  );
};

export default LevelsProvider;
