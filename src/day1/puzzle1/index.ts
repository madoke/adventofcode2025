import { processLineByLine } from "../../common/input-processing.js";
import { parseInstruction } from "../input-parsing.js";
import { BasePuzzle } from "../BasePuzzle.js";
import { BigNumber } from "bignumber.js";

class Day1Puzzle1 extends BasePuzzle {
	constructor(private password = 0) {
		super();
	}

	private async onRotation(line: string): Promise<void> {
		const instruction = parseInstruction(line);

		const { nextPosition } = this.rotateDial(instruction);

		if (nextPosition === 0) {
			this.password += 1;
		}
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		this.resetDial();
		await processLineByLine(inputFilePath, (line) => this.onRotation(line));
		return new BigNumber(this.password);
	}
}

export { Day1Puzzle1 };
