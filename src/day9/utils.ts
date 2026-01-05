import { BigNumber } from "bignumber.js";
import type { Point } from "./types.js";

export const parsePoint = (line: string): Point => {
	const [x, y] = line.split(",").map((s) => parseInt(s));
	if (!x || !y) {
		throw new Error("Unable to parse point");
	}

	return { x, y };
};

export const area = (a: Point, b: Point): BigNumber => {
	const rectw = Math.abs(a.x - b.x) + 1;
	const recth = Math.abs(a.y - b.y) + 1;
	return new BigNumber(rectw * recth);
};
