import { strToNumber } from '../utils';

const DEFAULT_PORT = 8080;
const DEFAULT_JSON_CONFIG_FILE_PATH = '/app/config/config.js';

export interface BaseConfig {
	port: number;
	jsonConfigFilePath: string;
	jsonConfig?: string;
}

export function resolveBaseConfig(): BaseConfig {
	const config: Partial<BaseConfig> = {
		port: strToNumber(process.env.PORT),
		jsonConfigFilePath: process.env.JSON_CONFIG_FILE_PATH,
		jsonConfig: process.env.JSON_CONFIG,
	};

	if (!config.port) {
		config.port = DEFAULT_PORT;
	}

	if (!config.jsonConfigFilePath) {
		config.jsonConfigFilePath = DEFAULT_JSON_CONFIG_FILE_PATH;
	}

	return config as BaseConfig;
}
