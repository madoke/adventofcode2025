import { processLineByLine } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";

const SPLITTER = "^";
const EMPTY = ".";
const START = "S";
const BEAM = "|";

export class Day7Puzzle1 implements PuzzleInterface {
	constructor(private mainfold: string[][] = []) {}

	private async readLine(line: string): Promise<void> {
		const newLine: string[] = [];
		for (const char of line) {
			newLine.push(char);
		}
		this.mainfold.push(newLine);
	}

	private processMainfold(): number {
		let totalSplits = 0;
		for (let i = 1; i < this.mainfold.length; i++) {
			const row = this.mainfold[i];
			const previousRow = this.mainfold[i - 1];
			if (!row || !previousRow) {
				throw new Error("Could not find rows");
			}
			for (let j = 0; j < row.length; j++) {
				if (previousRow[j] === START || previousRow[j] === BEAM) {
					if (row[j] === EMPTY) {
						row[j] = BEAM;
					}
					if (row[j] === SPLITTER) {
						if (j > 0 && row[j - 1] === EMPTY) {
							row[j - 1] = BEAM;
						}
						if (j < row.length - 1 && row[j + 1] === EMPTY) {
							row[j + 1] = BEAM;
						}
						totalSplits += 1;
					}
				}
			}
		}
		return totalSplits;
	}

	private printMainfold(): void {
		for (const line of this.mainfold) {
			console.log(line.join(""));
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line: string) =>
			this.readLine(line),
		);
		const result = this.processMainfold();
		this.printMainfold();
		return new BigNumber(result);
	}
}

export default Day7Puzzle1;
