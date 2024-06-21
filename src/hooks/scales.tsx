import React, { createContext, useContext, useEffect, useState } from 'react';
import { tcpConnect } from '../helpers/tcpSocket';
import Socket from 'react-native-tcp-socket/lib/types/Socket';
import { handleTCPData } from '../helpers/utils';

type scale = { type: 'tcp' | 'bluetooth', port: number, host: string };

interface ScalesContextProps {
    connect: (scale: scale) => void;
    connecting: boolean;
    connected: boolean;
    weight: number;
    unit: string;
}

const ScalesContext = createContext<ScalesContextProps | undefined>(undefined);

interface ScalesProviderProps {
    children: React.ReactNode;
}

export const ScalesProvider: React.FC<ScalesProviderProps> = ({ children }) => {

    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('kg');
    const [socket, setSocket] = useState<Socket | null>(null);

    const connect = ({ type, host, port }: scale) => {
        switch (type) {
            case 'tcp':
                setConnecting(true);
                tcpConnect(port, host).then(setSocket).catch(console.error);
                break;
            case 'bluetooth':
                //bluetooth integration
                break;
        }
    }

    useEffect(() => {
        socket?.on('data', (data) => {
            console.log(data);
            const { unidade, valor } = handleTCPData(data);
            setWeight(parseFloat(valor));
            setUnit(unidade);
        });

        socket?.on('error', (error) => {
            console.error(error);
            setConnected(false);
            setConnecting(false);
        });

        socket?.on('close', () => {
            setConnected(false);
            setConnecting(false);
        });

        socket?.on('connect', () => {
            setConnected(true);
            setConnecting(false);
        });

        return () => {
            socket?.destroy();
        }
    }, [socket])



    return (
        <ScalesContext.Provider value={{ connect, connected, connecting, weight, unit }}>
            {children}
        </ScalesContext.Provider>
    );
};

export const useScales = (): ScalesContextProps => {
    const context = useContext(ScalesContext);

    if (!context) {
        throw new Error('useScales must be used within a ScalesProvider');
    }

    return context;
};