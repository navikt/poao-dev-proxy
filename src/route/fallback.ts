import { Request, Response } from 'express';

export function fallback(): (req: Request, res: Response) => void {
	return (req: Request, res: Response): void => {
		res.statusCode = 404
		res.send(`
			<html lang="en">
				<body>
					<h1>Proxy error</h1>
					<p>${req.url} is not a configured proxy route</p>
				</body>
			</html>
		`)
	}
}