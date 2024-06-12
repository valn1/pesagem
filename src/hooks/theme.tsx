import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../entities/commons/theme';
import { light } from '../assets/themes/light';
import { dark } from '../assets/themes/dark';
import { ThemeProvider as SThemeProvider } from 'styled-components/native';

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(light);
    const toggleTheme = () => {
        const newTheme = theme.themeName === 'light' ? dark : light;
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <SThemeProvider theme={theme}>
                {children}
            </SThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};