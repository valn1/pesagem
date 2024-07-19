import React, { createContext, useContext, useEffect, useState } from 'react';
import { server } from '../helpers/server';

interface ServerContextProps {
    url?: string;
    host: string;
    setHost?: (host: string) => void;
    route: string;
    setRoute?: (host: string) => void;
};

const ServerContext = createContext<ServerContextProps | undefined>(undefined);

interface ServerProviderProps {
    children: React.ReactNode;
};

export const ServerProvider: React.FC<ServerProviderProps> = ({ children }) => {
    const [host, setHost] = useState('');
    const [route, setRoute] = useState('');
    const [url, setUrl] = useState('');

    const onSetHost = (host: string) => {
        setHost(host);
        server.updateServer(host, route);
    }

    const onSetRoute = (route: string) => {
        setRoute(route);
        server.updateServer(host, route);
    }

    useEffect(() => {
        if (server.url) {
            setUrl(server.url);
            setHost(server.host);
            setRoute(server.route);
        } else {
            server.getServer().then((response) => {
                if (response) {
                    setUrl(response.url);
                    setHost(response.host);
                    setRoute(response.route);
                }
            });
        }
    }, []);

    return (
        <ServerContext.Provider value={{ host, setHost: onSetHost, route, setRoute: onSetRoute, url }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => {
    const context = useContext(ServerContext);

    if (!context) {
        throw new Error('useServer must be used within an ServerProvider');
    };

    return context;
};