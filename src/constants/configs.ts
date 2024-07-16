import { Config } from '../entities/commons/configs';

export const localConfigs: Record<string, Config> = {
	theme: {
		nome: 'theme',
		default: 'light',
		constrained: true,
		options: ['light', 'dark']
	}
};
