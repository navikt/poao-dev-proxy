import { readConfigFile } from '../utils/config-utils'
import { resolveBaseConfig } from './base-config'
import { logProxyConfig, ProxyConfig, resolveProxyConfig } from './proxy-config'

const DEFAULT_JSON_CONFIG_FILE_PATH = '/app/config/config.js'

export interface AppConfig {
	port: number;
	proxy: ProxyConfig;
}

export function createAppConfig(): AppConfig {
	const jsonConfigEnv = process.env.JSON_CONFIG
	const jsonConfigFilePath = process.env.JSON_CONFIG_FILE_PATH || DEFAULT_JSON_CONFIG_FILE_PATH

	const jsonConfig = jsonConfigEnv
		? JSON.parse(jsonConfigEnv)
		: readConfigFile(jsonConfigFilePath)

	const baseConfig = resolveBaseConfig(jsonConfig)

	return {
		...baseConfig,
		proxy: resolveProxyConfig(jsonConfig),
	}
}

export function logAppConfig(appConfig: AppConfig): void {
	console.info(`Base config: port=${appConfig.port}`)

	logProxyConfig(appConfig.proxy)
}