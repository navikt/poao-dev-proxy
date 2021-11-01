import { NextFunction, Request, Response } from 'express'

const corsAllowHeaders = [
	'nav-consumer-id'
];

export function corsMiddleware(): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction): void => {

		res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '')
		res.setHeader('Access-Control-Allow-Credentials', 'true')

		if (req.method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
			res.setHeader('Access-Control-Max-Age', '7200')
			res.setHeader('Access-Control-Allow-Headers', corsAllowHeaders.join(', '))
			res.sendStatus(200)
		} else {
			next()
		}
	}
}
