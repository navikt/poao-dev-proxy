import { strToNumber } from '../utils'
import { JsonConfig } from '../utils/config-utils';

const DEFAULT_PORT = 8080

export interface BaseConfig {
	port: number;
}

export function resolveBaseConfig(jsonConfig: JsonConfig | undefined): BaseConfig {
	const config: Partial<BaseConfig> = {
		port: strToNumber(jsonConfig?.port),
	}

	if (!config.port) {
		config.port = DEFAULT_PORT
	}

	return config as BaseConfig
}
