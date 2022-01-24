import { Application } from 'express'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

import { AppConfig } from '../config/app-config-resolver'
import { Proxy } from '../config/proxy-config'
import * as http from 'http';
import type * as httpProxy from 'http-proxy';

export function registerProxies(app: Application, appConfig: AppConfig) {
	const contextPath = '/'

	appConfig.proxy.proxies.forEach(proxy => {
		app.use(contextPath, createProxy(contextPath, proxy))
	})
}

function createProxy(contextPath: string, proxy: Proxy) {
	return createProxyMiddleware(contextPath, {
		target: proxy.toUrl,
		logLevel: 'error',
		changeOrigin: true,
		selfHandleResponse: true,
		pathRewrite: proxy.preserveFromPath
			? undefined
			: { [`^${proxy.fromPath}`]: '' },
		onProxyReq: (proxyReq: http.ClientRequest, req: http.IncomingMessage, _res: http.ServerResponse, _options: httpProxy.ServerOptions) => {
			console.log(`\nProxying request ${proxyReq.method} ${proxyReq.path}`)
		},
		onProxyRes: responseInterceptor(async (responseBuffer: Buffer, proxyRes: http.IncomingMessage, _req: http.IncomingMessage, _res: http.ServerResponse) => {
			const body = responseBuffer.toString('utf8');

			console.log(`Proxy response ${proxyRes.statusCode} ${_res.req.method} ${_res.req.url}  \n======================================\n${body}\n======================================\n`)

			return responseBuffer;
		}),
		onError: (error, req, res) => {
			console.error(`Failed to proxy request: request=${req.url} error=${error.message}`)

			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('Failed to proxy request');
		},
	})
}