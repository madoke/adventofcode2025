import { processLineByLine } from "../../common/input-processing.js";
import { parseInstruction } from "../input-parsing.js";
import { BasePuzzle } from "../BasePuzzle.js";
import { BigNumber } from "bignumber.js";

// 0x434C49434B
class Day1Puzzle2 extends BasePuzzle {
	constructor(private password = 0) {
		super();
	}

	private async onRotation(line: string): Promise<void> {
		const instruction = parseInstruction(line);

		const { timesPastZero } = this.rotateDial(instruction);

		this.password += timesPastZero;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		this.resetDial();
		await processLineByLine(inputFilePath, (line) => this.onRotation(line));
		return new BigNumber(this.password);
	}
}

export { Day1Puzzle2 };
