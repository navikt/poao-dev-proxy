export const assert = <T extends any>(value: T | undefined | null, msg?: string): T => {
	if (value == null) {
		throw new Error(msg || 'Value is missing');
	}

	return value;
};

export const strToNumber = (str: string | undefined): number | undefined => {
	if (!str) {
		return undefined;
	}

	const num = parseInt(str, 10);

	if (isNaN(num)) {
		return undefined;
	}

	return num;
};
