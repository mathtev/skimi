import React, { createContext, useState } from 'react';


export interface Settings {
  foreignLanguage: string;
  nativeLanguage: string;
}

interface SettingsProviderProps {
  defaultSettings: Settings;
}

interface ISettingsContext {
  foreignLanguage?: string;
  nativeLanguage?: string;
  updateSettings: (newSettings: Settings) => void;
}

export const SettingsContext = createContext<ISettingsContext>({
  foreignLanguage: undefined,
  nativeLanguage: undefined,
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
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
