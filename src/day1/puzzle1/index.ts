import { join } from "node:path";
import { processLineByLine } from "../../common/input-processing.js";
import { parseInstruction } from "../input-parsing.js";
import { BasePuzzle } from "../BasePuzzle.js";

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

	public async run(inputFileName: string): Promise<void> {
		const filePath = join(process.cwd(), "src/day1/input", inputFileName);

		this.resetDial();

		await processLineByLine(filePath, (line) => this.onRotation(line));

		console.log(`Derived Password: ${this.password}`);
	}
}

export { Day1Puzzle1 };
