import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { processLineByLine } from "../../common/input-processing.js";
import { BigNumber } from "bignumber.js";

export class Day3Puzzle2 implements PuzzleInterface {
	constructor(private totalJoltage: BigNumber = new BigNumber(0)) {}

	private async processBatteryBank(batteryBank: string): Promise<void> {
		const batteries = batteryBank.split("").map(Number).reverse();

		const maxBatteries: number[] = [];
		let remainingBatteries = 12;
		let startIndex = remainingBatteries - 1;
		let endIndex = batteries.length - 1;

		while (remainingBatteries > 0) {
			const subBatteries = batteries.slice(startIndex, endIndex + 1);
			const maxBattery = Math.max(...subBatteries);
			maxBatteries.push(maxBattery);
			remainingBatteries -= 1;
			startIndex = remainingBatteries - 1;
			endIndex = startIndex + subBatteries.lastIndexOf(maxBattery);
		}
		const maxJoltage = new BigNumber(maxBatteries.join(""));
		console.log(`Max Joltage for ${batteryBank}: ${maxJoltage.toString()}`);
		this.totalJoltage = this.totalJoltage.plus(maxJoltage);
	}

	async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line) =>
			this.processBatteryBank(line),
		);
		return this.totalJoltage;
	}
}

export default Day3Puzzle2;
