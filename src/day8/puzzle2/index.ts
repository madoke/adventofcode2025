import { BigNumber } from "bignumber.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import type { Connection, Point } from "../types.js";
import {
	calculateDistance,
	parsePoint,
	pointToString,
	// printAllConnections,
	printConnection,
} from "../utils.js";
import { processLineByLine } from "../../common/input-processing.js";

export class Day8Puzzle2 implements PuzzleInterface {
	constructor(private points: Point[] = []) {}

	private computeClosestConnections(): Connection[] {
		const connections = [];
		for (let i = 0; i < this.points.length - 1; i++) {
			for (let j = i + 1; j < this.points.length; j++) {
				const a = this.points[i];
				const b = this.points[j];
				if (!a || !b) {
					throw new Error("Could not find points");
				}
				const distance = calculateDistance(a, b);
				connections.push({ a, b, distance });
			}
		}
		return connections.sort((a, b) => a.distance.minus(b.distance).toNumber());
	}

	private computeCircuits(): BigNumber {
		const circuits: Set<string>[] = [];
		const connections = this.computeClosestConnections();

		// printAllConnections(connections);

		for (const connection of connections) {
			const pointA = pointToString(connection.a);
			const pointB = pointToString(connection.b);

			let fitsExistingCircuit = false;
			let indexToMergeWith: number | null = null;
			const indexesToMerge: number[] = [];

			for (let j = 0; j < circuits.length; j++) {
				const circuit = circuits[j];
				if (!circuit) {
					throw new Error("Could not find circuit");
				}
				if (circuit.has(pointA) && circuit.has(pointB)) {
					console.log(`${pointA} and ${pointB} already exist in circuit ${j}`);
					fitsExistingCircuit = true;
					break;
				} else if (circuit.has(pointA) || circuit.has(pointB)) {
					console.log(`Adding ${pointA} and ${pointB} to circuit ${j}`);
					circuit.add(pointA);
					circuit.add(pointB);

					fitsExistingCircuit = true;
					indexToMergeWith = j;

					for (let z = j + 1; z < circuits.length; z++) {
						const otherCircuit = circuits[z];
						if (!otherCircuit) {
							throw new Error("Could not find other circuit");
						}
						if (otherCircuit.has(pointA) || otherCircuit.has(pointB)) {
							console.log(`${pointA} or ${pointB} are in circuit ${z}`);
							indexesToMerge.push(z);
						}
					}
					break;
				}
			}

			if (!fitsExistingCircuit) {
				circuits.push(new Set([pointA, pointB]));
			}

			if (indexToMergeWith !== null && indexesToMerge.length > 0) {
				console.log("Merging circuits");
				const circuitToMergeWith = circuits[indexToMergeWith];
				if (!circuitToMergeWith) {
					throw new Error("Could not find circuit to merge with");
				}
				for (let y = 0; y < indexesToMerge.length; y++) {
					const indexToMerge = indexesToMerge[y];
					if (!indexToMerge) {
						throw new Error("Could not find index to merge");
					}
					const circuitToMerge = circuits[indexToMerge];
					if (!circuitToMerge) {
						throw new Error("Could not find circuit to merge");
					}
					for (const p of circuitToMerge) {
						circuitToMergeWith.add(p);
					}
					console.log(`Merging circuit ${indexToMerge} with circuit ${indexToMergeWith}`);
					circuits.splice(indexToMerge - y, 1);
				}
			}

			if (circuits.length === 1 && circuits[0]?.size === this.points.length) {
				printConnection(connection);
				return new BigNumber(connection.a.x * connection.b.x);
			}
		}
		console.log(circuits.length);
		return new BigNumber(0);
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, async (line) => {
			const point = parsePoint(line);
			this.points.push(point);
		});
		const totalSum = this.computeCircuits();
		return new BigNumber(totalSum);
	}
}

export default Day8Puzzle2;
