import React from "react";

export const ScrollRestorationContext = React.createContext({
  scrollPosition: null,
  setScrollPosition: () => {},
});

export const ScrollRestorationProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = React.useState(null);

  return (
    <ScrollRestorationContext.Provider
      value={{ scrollPosition, setScrollPosition }}
    >
      {children}
    </ScrollRestorationContext.Provider>
  );
};
