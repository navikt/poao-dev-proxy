import { JsonConfig } from './app-config-resolver';

export interface ProxyConfig {
	proxies: Proxy[];
}

export interface Proxy {
	fromPath: string;
	preserveFromPath: boolean;
	toUrl: string;
}

const DEFAULT_PRESERVE_FROM_PATH = false;

export const logProxyConfig = (proxyConfig: ProxyConfig): void => {
	proxyConfig.proxies.forEach((proxy) => {
		const { fromPath, toUrl, preserveFromPath } = proxy

		console.info(`Proxy config entry: fromPath=${fromPath} toUrl=${toUrl} preserveFromPath=${preserveFromPath}`)
	})
}

export const resolveProxyConfig = (proxies: JsonConfig.Proxy[] | undefined): ProxyConfig => {
	if (!proxies) {
		return { proxies: [] };
	}

	return {
		proxies: proxies.map(p => validateProxy(toPartialProxy(p)))
	};
};

const toPartialProxy = (proxy: JsonConfig.Proxy): Partial<Proxy> => {
	const partialProxy: Partial<Proxy> = {
		fromPath: proxy.fromPath,
		toUrl: proxy.toUrl,
		preserveFromPath: proxy.preserveFromPath,
	};

	if (proxy.preserveFromPath == null) {
		proxy.preserveFromPath = DEFAULT_PRESERVE_FROM_PATH;
	}

	return partialProxy
}

const validateProxy = (proxy: Partial<Proxy>): Proxy => {
	if (!proxy.fromPath) {
		throw new Error(`The field 'fromPath' is missing from proxy`)
	}

	if (!proxy.fromPath.startsWith('/')) {
		throw new Error(`'${proxy.fromPath}' is not a relative path starting with '/'`)
	}

	if (!proxy.toUrl) {
		throw new Error(`The field 'toUrl' is missing from proxy`)
	}

	return proxy as Proxy
}
