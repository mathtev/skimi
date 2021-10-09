import React, { createContext, useState } from 'react';


export interface Settings {
  learningLanguage: string;
  nativeLanguage: string;
}

interface ISettingsContext {
  settings: Settings | null;
  updateSettings: (newSettings: Settings) => void;
}

interface SettingsProviderProps {
  defaultSettings: Settings;
}

export const SettingsContext = createContext<ISettingsContext>({
  settings: null,
  updateSettings: () => undefined,
});

const SettingsProvider: React.FC<SettingsProviderProps> = ({
  defaultSettings,
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
