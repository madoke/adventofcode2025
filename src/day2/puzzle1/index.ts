import { join } from "node:path";
import { processByDelimiter } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import BigNumber from "bignumber.js";

type Range = {
	start: BigNumber;
	end: BigNumber;
};

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

	private parseRange(rangeStr: string): Range {
		const [startStr, endStr] = rangeStr.split("-");

		if (!startStr || !endStr) {
			throw new Error(`Invalid range format: ${rangeStr}`);
		}

		return {
			start: new BigNumber(startStr),
			end: new BigNumber(endStr),
		};
	}

	private async onRange(range: string): Promise<void> {
		const parsedRange = this.parseRange(range);

		console.log(
			`Processing range: ${parsedRange.start.toString()} - ${parsedRange.end.toString()}`,
		);

		for (let id = parsedRange.start; id.lte(parsedRange.end); id = id.plus(1)) {
			const idStr = id.toString();
			if (this.containsDuplicateDigits(idStr)) {
				// For demonstration, we just log the valid ID
				console.log(`Valid ID with duplicates: ${idStr}`);
				this.sumOfInvalidIds = this.sumOfInvalidIds.plus(id);
			}
		}
	}

	public async run(inputFileName: string): Promise<void> {
		const filePath = join(process.cwd(), "src/day2/input", inputFileName);
		console.log(`Reading file: ${filePath}`);
		await processByDelimiter(filePath, ",", async (chunk: string) => {
			await this.onRange(chunk);
		});
		console.log(`Sum of invalid IDs: ${this.sumOfInvalidIds.toString()}`);
	}
}

export default Day2Puzzle1;
