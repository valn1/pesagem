import React, { createContext, useContext, useEffect, useState } from 'react';
import { Config, configValue } from '../entities/commons/configs';
import { initConfigs, getConfigValue as _getConfigValue, updateConfig, getAllConfigs } from '../helpers/configs';
import { localConfigs } from '../constants/configs';

interface ConfigsContextProps {
    getConfigs: () => Promise<Config[]>;
    getConfigValue: (configName: string) => Promise<string>;
    setConfigValue: (configName: string, value: string) => Promise<void>;
    userConfigs: configValue[];
    setUserId: (userId: number) => void;
};

const ConfigsContext = createContext<ConfigsContextProps | undefined>(undefined);

interface ConfigsProviderProps {
    children: React.ReactNode;
};

export const ConfigsProvider: React.FC<ConfigsProviderProps> = ({ children }) => {

    const [userConfigs, setUserConfigs] = useState<configValue[]>([]);
    const [userId, setUserId] = useState(1);

    const getConfigs = async () => {
        try {
            const configs = await getAllConfigs(userId);
            setUserConfigs(configs.map((config) => ({
                nome: String(config.DS_CHAVE),
                value: String(config.DS_VALOR)
            })));
            return configs as Config[];
        } catch (error) {
            console.error(error);
            return [] as Config[];
        }
    };

    const getConfigValue = async (configName: string) => {
        try {
            const value = await _getConfigValue(configName, userId);
            return value;
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    const setConfigValue = async (configName: string, value: string) => {
        updateConfig(configName, value, userId).then((a) => {
            console.log('Configuração atualizada', a);
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        //todo: pegar configs do servidor e juntar com as locais
        Object.keys(localConfigs).forEach(async (configName) => {
            const config = localConfigs[configName];
            await initConfigs(config.nome, 1);
        });
    }, []);

    return (
        <ConfigsContext.Provider value={{ userConfigs, getConfigs, getConfigValue, setConfigValue, setUserId }}>
            {children}
        </ConfigsContext.Provider>
    );
};

export const useConfigs = () => {
    const context = useContext(ConfigsContext);

    if (!context) {
        throw new Error('useConfigs must be used within an ConfigsProvider');
    };

    return context;
};