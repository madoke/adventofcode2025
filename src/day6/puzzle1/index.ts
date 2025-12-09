import { processLineByLine } from "../../common/input-processing.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";

enum Operator {
	Plus = "+",
	Times = "*",
}

const SINGLE_OPERAND_REGEX = /(\d+)\s*/g;
const SINGLE_OPERATOR_REGEX = /([+|*])\s*/g;

export class Day6Puzzle1 implements PuzzleInterface {
	constructor(
		private operands: BigNumber[][] = [],
		private operators: Operator[] = [],
	) {}

	private parseRow(row: string) {
		let match = SINGLE_OPERAND_REGEX.exec(row);
		if (match) {
			const operandRow: BigNumber[] = [];
			while (match !== null) {
				operandRow.push(new BigNumber(match[1] ?? 0));
				match = SINGLE_OPERAND_REGEX.exec(row);
			}
			this.operands.push(operandRow);
			console.log(operandRow);
		} else {
			match = SINGLE_OPERATOR_REGEX.exec(row);
			while (match !== null) {
				this.operators.push(match[1] as Operator);
				match = SINGLE_OPERATOR_REGEX.exec(row);
			}
			console.log(this.operators);
		}
	}

	private calculateProblems(): BigNumber {
		let puzzleTotal = new BigNumber(0);

		for (let i = 0; i < this.operators.length; i++) {
			const operator = this.operators[i];

			console.log(`operator ${operator}`);
			let problemTotal = new BigNumber(0);

			for (let j = 0; j < this.operands.length; j++) {
				const operand = this.operands[j]?.[i];
				if (!operand) {
					throw new Error("Could not find operand");
				}

				if (j === 0) {
					problemTotal = operand;
				} else if (operator === Operator.Plus) {
					problemTotal = problemTotal.plus(operand);
				} else {
					problemTotal = problemTotal.times(operand);
				}

				console.log(problemTotal);
			}

			puzzleTotal = puzzleTotal.plus(problemTotal);
		}

		return puzzleTotal;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, async (line) => this.parseRow(line));
		return new BigNumber(this.calculateProblems());
	}
}

export default Day6Puzzle1;
