import { JsonConfig } from '../utils/config-utils'

export interface ProxyConfig {
	proxies: Proxy[];
}

export interface Proxy {
	fromPath: string;
	fromContextPath?: string;
	toUrl: string;
}

export const logProxyConfig = (proxyConfig: ProxyConfig): void => {
	proxyConfig.proxies.forEach((proxy) => {
		const { fromPath, toUrl, fromContextPath } = proxy

		console.info(`Proxy config entry: ${fromPath} -> ${toUrl} ${fromContextPath ? '. Context path: ' + fromContextPath : ''}`)
	})
}

export const resolveProxyConfig = (jsonConfig: JsonConfig | undefined): ProxyConfig => {
	const config = resolveProxyConfigFromJson(jsonConfig)

	if (!config.proxies) {
		config.proxies = []
	}

	validateProxyConfig(config)

	return config as ProxyConfig
}

const resolveProxyConfigFromJson = (jsonConfig: JsonConfig | undefined): Partial<ProxyConfig> => {
	if (!jsonConfig?.proxy) return {}
	return jsonConfig.proxy
}

const validateProxyConfig = (config: Partial<ProxyConfig>): void => {
	if (!config.proxies || config.proxies.length === 0) {
		return
	}

	config.proxies.forEach((proxy) => {
		const proxyJson = JSON.stringify(proxy)

		if (!proxy.fromPath) {
			throw new Error(`The field 'fromPath' is missing from: ${proxyJson}`)
		}

		if (!proxy.fromPath.startsWith('/')) {
			throw new Error(`'${proxy.fromPath}' is not a relative path starting with '/'`)
		}

		if (!proxy.toUrl) {
			throw new Error(`The field 'toUrl' is missing from: ${proxyJson}`)
		}
	})
}
