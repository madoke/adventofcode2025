import { join } from "node:path";
import { processLineByLine } from "../../common/input-processing.js";
import { parseInstruction } from "../input-parsing.js";
import { BasePuzzle } from "../BasePuzzle.js";

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

	public async run(inputFileName: string): Promise<void> {
		const filePath = join(process.cwd(), "src/day1/input", inputFileName);

		this.resetDial();

		await processLineByLine(filePath, (line) => this.onRotation(line));

		console.log(`Derived Password: ${this.password}`);
	}
}

export { Day1Puzzle2 };
