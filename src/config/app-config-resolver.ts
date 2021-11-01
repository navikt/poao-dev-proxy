import { readConfigFile } from '../utils/config-utils'
import { resolveBaseConfig } from './base-config'
import { logProxyConfig, ProxyConfig, resolveProxyConfig } from './proxy-config'

export interface AppConfig {
	port: number;
	proxy: ProxyConfig;
}

export function createAppConfig(): AppConfig {
	const baseConfig = resolveBaseConfig()

	const jsonConfig = baseConfig.jsonConfig
		? JSON.parse(baseConfig.jsonConfig)
		: readConfigFile(baseConfig.jsonConfigFilePath)

	return {
		port: baseConfig.port,
		proxy: resolveProxyConfig(jsonConfig),
	}
}

export function logAppConfig(appConfig: AppConfig): void {
	console.info(`Base config: port=${appConfig.port}`)

	logProxyConfig(appConfig.proxy)
}