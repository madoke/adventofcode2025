import type { Connection, Point } from "./types.js";
import { BigNumber } from "bignumber.js";

export const parsePoint = (line: string): Point => {
	const [x, y, z] = line.split(",").map(Number);
	if (x === undefined || y === undefined || z === undefined) {
		throw new Error(`Invalid point: ${line}`);
	}
	return { x, y, z };
};

export const calculateDistance = (point1: Point, point2: Point): BigNumber => {
	return new BigNumber(Math.sqrt(((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2) + ((point1.z - point2.z) ** 2)));
};

export const pointEquals = (point1: Point, point2: Point): boolean => {
	return point1.x === point2.x && point1.y === point2.y && point1.z === point2.z;
};

export const printConnection = (c: Connection): void => {
	console.log(`(${c.a.x},${c.a.y},${c.a.z}) -> (${c.b.x},${c.b.y},${c.b.z}): ${c.distance}`);
};

export const pointToString = (p: Point): string => {
	return `${p.x},${p.y},${p.z}`
}

export const printAllConnections = (connections: Connection[]): void => {
	for(const c of connections) {
		printConnection(c);
	}
}