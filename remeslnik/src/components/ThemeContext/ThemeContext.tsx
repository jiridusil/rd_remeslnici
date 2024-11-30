import { createContext, useState, ReactNode } from "react";

type ThemeContextType = {
  themeWrapper: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeWrapper: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeWrapper, setThemeWrapper] = useState("light");

  const toggleTheme = () => {
    setThemeWrapper((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeWrapper, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
