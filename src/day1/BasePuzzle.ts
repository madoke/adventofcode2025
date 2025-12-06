import type { PuzzleInterface } from "../common/PuzzleInterface.js";
import { Direction, type DialState, type Instruction } from "./types.js";

export abstract class BasePuzzle implements PuzzleInterface {
	constructor(protected dialState: DialState = { position: 50 }) {}

	protected resetDial(): void {
		this.dialState = { position: 50 };
	}

	protected rotateDial(instruction: Instruction): {
		nextPosition: number;
		timesPastZero: number;
	} {
		let timesPastZero = 0;
		let nextPosition =
			instruction.direction === Direction.Left
				? this.dialState.position - instruction.distance
				: this.dialState.position + instruction.distance;

		if (nextPosition < 0 || nextPosition > 99) {
			while (nextPosition > 99) {
				nextPosition -= 100;
				timesPastZero += 1;
			}

			if (nextPosition < 0) {
				while (nextPosition < 0) {
					nextPosition += 100;
					timesPastZero += 1;
				}
				if (this.dialState.position === 0 && timesPastZero > 0) {
					timesPastZero -= 1;
				}
				if (nextPosition === 0) {
					timesPastZero += 1;
				}
			}
		} else if (nextPosition === 0) {
			timesPastZero += 1;
		}

		this.dialState.position = nextPosition;

		return { nextPosition, timesPastZero };
	}

	abstract run(inputFileName: string): Promise<void>;
}
