import { BigNumber } from "bignumber.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import type { Point } from "../types.js";
import { processLineByLine } from "../../common/input-processing.js";
import { area, parsePoint } from "../utils.js";

export class Day9Puzzle1 implements PuzzleInterface {
	constructor(private points: Point[] = []) {}

	private async processLine(line: string): Promise<void> {
		const point = parsePoint(line);
		this.points.push(point);
	}

	private largestArea(): BigNumber {
		let result = new BigNumber(0);

		for (let i = 0; i < this.points.length - 1; i++) {
			for (let j = i + 1; j < this.points.length; j++) {
				const a = this.points[i];
				const b = this.points[j];
				if (!a || !b) {
					throw new Error("Could not find points");
				}
				const rectarea = area(a, b);
				if (result.lt(rectarea)) {
					result = rectarea;
				}
			}
		}
		return result;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line) => this.processLine(line));
		return this.largestArea();
	}
}

export default Day9Puzzle1;
