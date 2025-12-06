import { join } from "path";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { processLineByLine } from "../../common/input-processing.js";

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

	async run(inputFileName: string): Promise<void> {
		// Implementation for Day 3 Puzzle 1
		console.log(`Running Day 3 Puzzle 1 with input file: ${inputFileName}`);
		const filePath = join(process.cwd(), "src/day3/input", inputFileName);

		await processLineByLine(filePath, (line) => this.processBatteryBank(line));

		console.log(`TotalJoltage: ${this.totalJoltage}`);
	}
}

export default Day3Puzzle1;
