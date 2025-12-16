import { processLineByLine } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";

const SPLITTER = "^";
const START = "S";

export class Day7Puzzle2 implements PuzzleInterface {
	constructor(
		private mainfold: string[] = [],
		private cache: Map<string, BigNumber> = new Map(),
	) {}

	private async readLine(line: string): Promise<void> {
		this.mainfold.push(line);
	}

	private processMainfold(): BigNumber {
		const firstRow = this.mainfold[0];
		if (!firstRow) {
			throw new Error("Could not get first row");
		}

		const startNodeIndex = firstRow.indexOf(START);
		if (!startNodeIndex) {
			throw new Error("Could not find start node");
		}

		return this.countTimelines(0, startNodeIndex);
	}

	private countTimelinesWithCache(
		rowIndex: number,
		colIndex: number,
	): BigNumber {
		const cacheKey = `${rowIndex},${colIndex}`;
		const cachedResult = this.cache.get(cacheKey);
		if (cachedResult) {
			return cachedResult;
		} else {
			const result = this.countTimelines(rowIndex, colIndex);
			this.cache.set(cacheKey, result);
			return result;
		}
	}

	private countTimelines(rowIndex: number, colIndex: number): BigNumber {
		// Stop Condition
		if (rowIndex === this.mainfold.length - 1) {
			return new BigNumber(1);
		}

		const currentRow = this.mainfold[rowIndex];
		if (!currentRow) {
			throw new Error("Could not find current row");
		}

		const nextRowIndex = rowIndex + 1;
		const nextRow = this.mainfold[nextRowIndex];
		if (!nextRow) {
			throw new Error("Could not find nextRow");
		}

		const nextNode = nextRow[colIndex];
		if (!nextNode) {
			throw new Error("Could not find next node");
		}

		if (nextNode === SPLITTER) {
			// Process alternate realities
			const nextColIndex = colIndex + 1;
			const prevColIndex = colIndex - 1;

			return new BigNumber(0)
				.plus(this.countTimelinesWithCache(rowIndex, prevColIndex))
				.plus(this.countTimelinesWithCache(rowIndex, nextColIndex));
		} else {
			// Move down 1 row
			return this.countTimelinesWithCache(nextRowIndex, colIndex);
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line: string) =>
			this.readLine(line),
		);
		const result = this.processMainfold();
		return new BigNumber(result);
	}
}

export default Day7Puzzle2;
