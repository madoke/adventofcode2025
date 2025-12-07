import { processByDelimiter } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import BigNumber from "bignumber.js";
import { parseRange } from "../input-parsing.js";

export class Day2Puzzle1 implements PuzzleInterface {
	constructor(private sumOfInvalidIds: BigNumber = new BigNumber(0)) {}

	private containsDuplicateDigits(id: string): boolean {
		// exclude odd length IDs
		if (id.length % 2 > 0) {
			return false;
		}

		const splitIndex = id.length / 2;
		const firstHalf = id.slice(0, splitIndex);
		const secondHalf = id.slice(splitIndex);

		return firstHalf === secondHalf;
	}

	private async onRange(range: string): Promise<void> {
		const parsedRange = parseRange(range);
		for (let id = parsedRange.start; id.lte(parsedRange.end); id = id.plus(1)) {
			const idStr = id.toString();
			if (this.containsDuplicateDigits(idStr)) {
				// For demonstration, we just log the valid ID
				console.log(`Valid ID with duplicates: ${idStr}`);
				this.sumOfInvalidIds = this.sumOfInvalidIds.plus(id);
			}
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processByDelimiter(inputFilePath, ",", async (chunk: string) => {
			await this.onRange(chunk);
		});
		return this.sumOfInvalidIds;
	}
}

export default Day2Puzzle1;
