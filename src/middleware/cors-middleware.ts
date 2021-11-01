import { NextFunction, Request, Response } from 'express'

export function corsMiddleware(): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction): void => {

		res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '')
		res.setHeader('Access-Control-Allow-Credentials', 'true')

		if (req.method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
			res.setHeader('Access-Control-Max-Age', '7200')
			res.setHeader('Access-Control-Allow-Headers', getCorsAllowHeaders(req).join(', '))
		}

		next()
	}
}

function getCorsAllowHeaders(req: Request): string[] {
	const unnecessaryHeaders = [ 'origin', 'cookie' ]

	return Object.keys(req.headers)
		.filter(header => !unnecessaryHeaders.includes(header))
}