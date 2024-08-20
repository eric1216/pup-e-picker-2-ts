import { createContext, ReactNode, useContext, useState } from 'react';

type TTabs = 'favorited' | 'unfavorited' | 'create' | null;

type TActiveTab = {
  activeTab: TTabs;
  handleTabChange: (input: TTabs) => void;
};

const ActiveTabContext = createContext<TActiveTab>({} as TActiveTab);

export const ActiveTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TTabs>(null);

  const handleTabChange = (selectedTab: TTabs) => {
    const newActiveTab = activeTab === selectedTab ? null : selectedTab;
    setActiveTab(newActiveTab);
  };

  return (
    <ActiveTabContext.Provider value={{ activeTab, handleTabChange }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveTab = () => useContext(ActiveTabContext);
