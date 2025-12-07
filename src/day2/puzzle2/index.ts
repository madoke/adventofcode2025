import {
	parseRange,
	processByDelimiter,
} from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import BigNumber from "bignumber.js";

export class Day2Puzzle2 implements PuzzleInterface {
	constructor(private sumOfInvalidIds: BigNumber = new BigNumber(0)) {}

	private containsDuplicateDigits(id: string): boolean {
		const splitIndex = Math.floor(id.length / 2);

		for (let i = 1; i <= splitIndex; i += 1) {
			if (id.length % i !== 0) {
				continue; // skip if the id length is not divisible by chunk size
			}

			// for each number split the string into chunks of that size
			const chunks: string[] = [];
			for (let j = 0; j < id.length; j += i) {
				chunks.push(id.slice(j, j + i));
			}

			// if all chunks are the same, return true
			if (chunks.every((chunk) => chunk === chunks[0])) {
				return true;
			}
		}
		return false;
	}

	private async onRange(range: string): Promise<void> {
		const parsedRange = parseRange(range);
		for (let id = parsedRange.start; id.lte(parsedRange.end); id = id.plus(1)) {
			const idStr = id.toString();
			if (this.containsDuplicateDigits(idStr)) {
				// For demonstration, we just log the valid ID
				// console.log(`Valid ID with duplicates: ${idStr}`);
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

export default Day2Puzzle2;
