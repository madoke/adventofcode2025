import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";
import type { Range } from "../../common/types.js";
import {
	parseRange,
	processLineByLine,
} from "../../common/input-processing.js";
export class Day5Puzzle2 implements PuzzleInterface {
	constructor(
		private ranges: Range[] = [],
		private rangesProcessed = false,
	) {}

	private rangeContains(a: Range, b: Range) {
		return a.start.lte(b.start) && a.end.gte(b.end);
	}

	private computeRanges(range: Range): Range[] {
		if (range.start.gt(range.end)) {
			throw new Error(`Invalid Range ${range.start}-${range.end}`);
		}

		const currentRange = range;
		const newRanges = [];

		for (let i = 0; i < this.ranges.length; i++) {
			const existingRange = this.ranges[i];
			if (!existingRange) {
				throw new Error("Range not found!");
			}

			// existing range contains range -> discard current range
			if (this.rangeContains(existingRange, currentRange)) {
				return this.ranges;
			}

			// current range contains exsisting range -> discard existing range
			else if (this.rangeContains(currentRange, existingRange)) {
				continue;
			}

			// overlaps with existing at the start -> adjust current range
			else if (
				currentRange.start.gt(existingRange.start) &&
				currentRange.start.lte(existingRange.end)
			) {
				currentRange.start = existingRange.end.plus(1);
				newRanges.push(existingRange);
			}

			// overlaps with existing at the end -> adjust current range
			else if (
				currentRange.end.lt(existingRange.end) &&
				currentRange.end.gte(existingRange.start)
			) {
				currentRange.end = existingRange.start.minus(1);
				newRanges.push(existingRange);
			} else {
				newRanges.push(existingRange);
			}
		}

		if (currentRange.start.lte(currentRange.end)) {
			newRanges.push(currentRange);
		}

		return newRanges;
	}

	private countFreshIngredients(): BigNumber {
		let freshIngredients = new BigNumber(0);
		for (const range of this.ranges) {
			freshIngredients = freshIngredients.plus(
				range.end.minus(range.start).plus(1),
			);
		}
		return freshIngredients;
	}

	private processLine(line: string): void {
		if (line.trim() === "") {
			this.rangesProcessed = true;
			return;
		}

		if (!this.rangesProcessed) {
			const range = parseRange(line);
			const newRanges = this.computeRanges(range);
			this.ranges = newRanges;
			return;
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, async (line: string) => {
			this.processLine(line);
		});
		const freshIngredients = this.countFreshIngredients();
		return freshIngredients;
	}
}

export default Day5Puzzle2;
