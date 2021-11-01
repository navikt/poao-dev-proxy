import { createProxyMiddleware } from 'http-proxy-middleware';
import http from 'http';
import * as httpProxy from 'http-proxy';
import { AppConfig } from '../config/app-config-resolver';
import { Application } from 'express';
import { Proxy } from '../config/proxy-config';

export function registerProxies(app: Application, appConfig: AppConfig) {
	const contextPath = '/';

	appConfig.proxy.proxies.forEach(proxy => {
		app.use(contextPath, createProxy(contextPath, proxy));
	});
}

function createProxy(contextPath: string, proxy: Proxy) {
	return createProxyMiddleware(contextPath, {
		target: proxy.toUrl,
		logLevel: 'debug',
		logProvider: () => console,
		changeOrigin: true,
		onProxyReq: (proxyReq: http.ClientRequest, req: http.IncomingMessage, res: http.ServerResponse, options: httpProxy.ServerOptions) => {
			console.info(`${JSON.stringify(req.headers)}`)
			console.info('req url', req.url)
			console.info(`Proxy req: ${JSON.stringify(proxyReq.getHeaders())}`)
		},
		onProxyRes: (proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse) => {
			console.log('proxy res status', proxyRes.statusCode)
		},
		onError: (error, request, response) => {
			console.error(`onError, error=${error.message}`);
		},
	})
}