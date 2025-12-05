import BigNumber from "bignumber.js";
import type { Range } from "./types.js";

export const parseRange = (rangeStr: string): Range => {
	const [startStr, endStr] = rangeStr.split("-");

	if (!startStr || !endStr) {
		throw new Error(`Invalid range format: ${rangeStr}`);
	}

	return {
		start: new BigNumber(startStr),
		end: new BigNumber(endStr),
	};
};
