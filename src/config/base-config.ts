import { JsonConfig } from './app-config-resolver';

const DEFAULT_PORT = 8080

export interface BaseConfig {
	port: number;
}

export function resolveBaseConfig(jsonConfig: JsonConfig.Config | undefined): BaseConfig {
	const config: Partial<BaseConfig> = {
		port: jsonConfig?.port
	}

	if (!config.port) {
		config.port = DEFAULT_PORT
	}

	return config as BaseConfig
}
