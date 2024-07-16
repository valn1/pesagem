export interface Config {
	nome: string;
	default: string;
	constrained: boolean;
	options: string[];
}

export type configValue = {
	nome: string;
	value: string;
};
