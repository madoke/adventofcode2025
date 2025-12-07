import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";
import type { Range } from "../../common/types.js";
import {
	parseRange,
	processLineByLine,
} from "../../common/input-processing.js";
export class Day5Puzzle1 implements PuzzleInterface {
	constructor(
		private ranges: Range[] = [],
		private freshIngredients = 0,
		private rangesProcessed = false,
	) {}

	private isWithinAnyRange(value: BigNumber): boolean {
		for (const range of this.ranges) {
			if (value.gte(range.start) && value.lte(range.end)) {
				return true;
			}
		}
		return false;
	}

	private processLine(line: string): void {
		if (line.trim() === "") {
			this.rangesProcessed = true;
			return;
		}

		if (!this.rangesProcessed) {
			this.ranges.push(parseRange(line));
			return;
		} else {
			const ingredientId = new BigNumber(line.trim());
			if (this.isWithinAnyRange(ingredientId)) {
				this.freshIngredients += 1;
			}
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, async (line: string) => {
			this.processLine(line);
		});
		return new BigNumber(this.freshIngredients);
	}
}

export default Day5Puzzle1;
