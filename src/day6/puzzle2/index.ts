import { processLineByLine } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";

enum Operator {
	Plus = "+",
	Times = "*",
}

const SINGLE_OPERATOR_REGEX = /([+|*])\s*/g;

export class Day6Puzzle2 implements PuzzleInterface {
	constructor(private rows: string[] = []) {}

	private async readRow(row: string): Promise<void> {
		this.rows.push(row);
	}

	private calculateProblems(): BigNumber {
		let puzzleTotal = new BigNumber(0);
		let currentProblemIndex = 0;

		const operatorRow = this.rows[this.rows.length - 1];
		if (!operatorRow) {
			throw new Error("Could not find operator row");
		}

		let op_match = SINGLE_OPERATOR_REGEX.exec(operatorRow);
		if (!op_match) {
			throw new Error("Could not match operator");
		}

		while (op_match !== null) {
			const operator = op_match[1] as Operator;
			let problemTotal = new BigNumber(0);

			// take -1 for the space
			const problemLength = op_match[0].length - 1;
			const start = currentProblemIndex;

			let end: number;
			if (currentProblemIndex + problemLength === operatorRow.length - 1) {
				// last match doesn't parse space
				end = currentProblemIndex + problemLength;
			} else {
				end = currentProblemIndex + problemLength - 1;
			}

			console.log(`Start ${start}, End ${end}`);

			for (let col = end; col >= start; col--) {
				let operandStr = "";
				for (let row = 0; row < this.rows.length - 1; row++) {
					const character = this.rows[row]?.[col];
					if (!character) {
						throw new Error("Could not find character");
					}

					operandStr += character.trim();
				}
				const operand = parseInt(operandStr, 10);
				console.log(operand);

				if (col === end) {
					problemTotal = new BigNumber(operand);
				} else if (operator === Operator.Plus) {
					problemTotal = problemTotal.plus(operand);
				} else {
					problemTotal = problemTotal.times(operand);
				}
			}

			console.log("Problem Total", problemTotal);

			puzzleTotal = puzzleTotal.plus(problemTotal);

			// add +1 for the space
			currentProblemIndex += problemLength + 1;

			// Match next operator
			op_match = SINGLE_OPERATOR_REGEX.exec(operatorRow);
		}

		return puzzleTotal;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, async (line) => this.readRow(line));

		return new BigNumber(this.calculateProblems());
	}
}

export default Day6Puzzle2;
