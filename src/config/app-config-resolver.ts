import { resolveBaseConfig } from './base-config'
import { logProxyConfig, ProxyConfig, resolveProxyConfig } from './proxy-config'

export interface AppConfig {
	port: number;
	proxy: ProxyConfig;
}

export function createAppConfig(): AppConfig {
	const jsonConfigEnv = process.env.JSON_CONFIG

	const jsonConfig = jsonConfigEnv
		? JSON.parse(jsonConfigEnv) as JsonConfig.Config
		: undefined

	const baseConfig = resolveBaseConfig(jsonConfig)

	return {
		...baseConfig,
		proxy: resolveProxyConfig(jsonConfig?.proxies),
	}
}

export function logAppConfig(appConfig: AppConfig): void {
	console.info(`Base config: port=${appConfig.port}`)

	logProxyConfig(appConfig.proxy)
}

export namespace JsonConfig {
	export interface Config {
		port?: number;
		proxies?: Proxy[];
	}

	export interface Proxy {
		fromPath: string;
		preserveFromPath?: boolean;
		toUrl: string;
	}
}