import express from 'express';

import { corsMiddleware } from './middleware/cors-middleware';
import { registerProxies } from './middleware/register-proxies';
import { createAppConfig, logAppConfig } from './config/app-config-resolver';

const app: express.Application = express();

async function startServer() {
	console.info('Starting dev proxy...');

	const appConfig = createAppConfig();

	logAppConfig(appConfig);

	app.set('trust proxy', 1);

	app.use(corsMiddleware());

	registerProxies(app, appConfig);

	app.listen(appConfig.port, () => console.info(`Server started successfully on port ${appConfig.port}`));
}

startServer().catch((err) => {
	console.error('Failed to start server', err);
});
