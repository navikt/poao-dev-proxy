import { existsSync, readFileSync } from "fs";

export interface JsonConfig {
	[key: string]: any;
}

export function readConfigFile(configFilePath: string): JsonConfig | undefined {
	if (!existsSync(configFilePath)) return undefined;

	const configStr = readFileSync(configFilePath).toString();

	return JSON.parse(configStr);
}
