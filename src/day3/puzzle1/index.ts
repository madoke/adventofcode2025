import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { processLineByLine } from "../../common/input-processing.js";
import { BigNumber } from "bignumber.js";

export class Day3Puzzle1 implements PuzzleInterface {
	constructor(private totalJoltage = 0) {}

	private async processBatteryBank(batteryBank: string): Promise<void> {
		const batteries = batteryBank.split("");

		let maxJoltage = 0;

		for (let i = 0; i < batteries.length - 1; i++) {
			for (let j = i + 1; j < batteries.length; j++) {
				const joltage = parseInt(`${batteries[i]}${batteries[j]}`, 10);
				if (maxJoltage === null || joltage > maxJoltage) {
					maxJoltage = joltage;
				}
			}
		}

		console.log(`Max Joltage for ${batteryBank}: ${maxJoltage}`);
		this.totalJoltage += maxJoltage;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line) =>
			this.processBatteryBank(line),
		);
		return new BigNumber(this.totalJoltage);
	}
}

export default Day3Puzzle1;
