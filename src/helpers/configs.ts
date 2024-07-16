import { QueryResult } from 'react-native-quick-sqlite';
import { localConfigs } from '../constants/configs';
import { Config } from '../entities/commons/configs';
import { TableColumns } from '../entities/commons/database';
import { db } from './database';

export const initConfigs = async (configName: string, userId: number): Promise<void> => {
	const response:TableColumns<'TBL_CONFIGURACAO'> = await db.selectFirst('TBL_CONFIGURACAO', ['DS_CHAVE'], `DS_CHAVE = ? AND FK_CD_USUARIO = ?`, [
		configName,
		userId
	]);
	if (!response.DS_CHAVE) {		
		const config = localConfigs[configName];
		await insertConfig(config, userId);
	}
};

const insertConfig = async (config: Config, userId: number): Promise<QueryResult> => {
	const values: TableColumns<'TBL_CONFIGURACAO'> = {
		DS_CHAVE: config.nome,
		DS_VALOR: config.default,
		X_CONSTRAINED: config.constrained,
		FK_CD_USUARIO: userId
	};
	const response = await db.insert('TBL_CONFIGURACAO', values);
	if (config.options && response.insertId) {
		await insertValidValues(response.insertId, config.options);
	}	
	return response;
};

const insertValidValues = async (configId: number, values: string[]): Promise<QueryResult[]> => {
	let response: QueryResult[] = [];
	while (values.length) {
		const value = values.pop();
		const insert:TableColumns<'TBL_VALORES_VALIDOS'> = { DS_VALOR: value, FK_CD_CONFIGURACAO: configId };
		const res = await db.insert('TBL_VALORES_VALIDOS', insert);
		response.push(res);
	}
	return response;
}

export const updateConfig = async (configName: string, value: string, userId: number): Promise<QueryResult> => {
	if (await validateConfig(configName, value)) {
		return await db.update('TBL_CONFIGURACAO', ['DS_VALOR'], [value], `DS_CHAVE = ? AND FK_CD_USUARIO = ?`, [
			configName,
			userId
		]);
	}else{
		return Promise.reject('Valor inválido');
	}
};

const validateConfig = async (configName: string, value: string): Promise<boolean> => {
	const response:TableColumns<'TBL_CONFIGURACAO'> = await db.selectFirst('TBL_CONFIGURACAO', ['X_CONSTRAINED','CD_ID'], `DS_CHAVE = ?`, [configName]);
	if (!response.X_CONSTRAINED) return true;
	const validValues:TableColumns<'TBL_CONFIGURACAO'>[] = await db.select('TBL_VALORES_VALIDOS', ['DS_VALOR'], `FK_CD_CONFIGURACAO = ?`, [response.CD_ID]);
	return validValues.some(v => v.DS_VALOR === value);
}

export const getConfigValue = async (configName: string, userId: number): Promise<string> => {
	const response:TableColumns<'TBL_CONFIGURACAO'> = await db.selectFirst('TBL_CONFIGURACAO', ['DS_VALOR'], `DS_CHAVE = ? AND FK_CD_USUARIO = ?`, [
		configName,
		userId
	]);
	return String(response.DS_VALOR);
};

export const getAllConfigs = async (userId: number): Promise<TableColumns<'TBL_CONFIGURACAO'>[]> => {
	return await db.select('TBL_CONFIGURACAO', ['DS_CHAVE', 'DS_VALOR'], `FK_CD_USUARIO = ?`, [userId]);
};