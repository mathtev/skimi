import React, { createContext } from 'react';
import LanguagesProvider from './languages/LanguagesProvider';
import LevelsProvider from './levels/LevelsProvider';
import SkillProvider from './skill/SkillProvider';

export const GraphqlDataContext = createContext(null);

const GraphqlDataProvider: React.FC = ({ children }) => {
  return (
    <GraphqlDataContext.Provider value={null}>
      <LanguagesProvider>
        <LevelsProvider>
          <SkillProvider>
            {children}
          </SkillProvider>
        </LevelsProvider>
      </LanguagesProvider>
    </GraphqlDataContext.Provider>
  );
};

export default GraphqlDataProvider;
