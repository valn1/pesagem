import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '../entities/commons/theme';
import { light } from '../assets/themes/light';
import { dark } from '../assets/themes/dark';
import { ThemeProvider as SThemeProvider } from 'styled-components/native';
import { useConfigs } from './configs';

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
    const configs = useConfigs();

    const [theme, setTheme] = useState<Theme>(light);
    const toggleTheme = () => {
        const newTheme = theme.themeName === 'light' ? dark : light;
        setTheme(newTheme);
        configs.setConfigValue('theme', newTheme.themeName);
    }

    useEffect(() => {
        if (!configs.userConfigs.length) {
            configs.getConfigs();
            return;
        }

        const themeConfig = configs.userConfigs.find(c => c.nome === 'theme');
        if (themeConfig && themeConfig.value !== theme.themeName) {
            setTheme(themeConfig.value === 'light' ? light : dark);
        }
    }, [configs.userConfigs]);

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