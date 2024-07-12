import React, { createContext, useContext, useState } from 'react';
import { auth } from '../helpers/auth';

interface AuthenticationContextProps {
    isLogged: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: (username: string,) => Promise<void>;
    refresh: (username: string,) => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextProps | undefined>(undefined);

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(true);

    const login = async (username: string, password: string) => {
        try {
            await auth.login(username, password);
            setIsLogged(true);
        } catch (error) {
            setIsLogged(false);
            console.error('Login failed:', error);
        }
    };

    const logout = async (username:string) => {
        try {
            await auth.logout(username);
            setIsLogged(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const refresh = async (username:string) => {
        try {
            await auth.refresh(username);
            setIsLogged(true);
        } catch (error) {
            setIsLogged(false);
            console.error('Refresh failed:', error);
        }
    };

    return (
        <AuthenticationContext.Provider value={{ isLogged, login, logout, refresh }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentication = (): AuthenticationContextProps => {
    const context = useContext(AuthenticationContext);

    if (!context) {
        throw new Error('useAuthentication must be used within an AuthenticationProvider');
    }

    return context;
};