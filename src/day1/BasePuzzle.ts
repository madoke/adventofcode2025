import { Direction, type DialState, type Instruction } from "./types.js";

const INITIAL_DIAL_STATE = { position: 50 };

export abstract class BasePuzzle {
	constructor(protected dialState: DialState = INITIAL_DIAL_STATE) {}

	protected resetDial(): void {
		this.dialState = INITIAL_DIAL_STATE;
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

			while (nextPosition < 0) {
				nextPosition += 100;
				timesPastZero += 1;
			}
		} else if (nextPosition === 0) {
			timesPastZero += 1;
		}

		this.dialState.position = nextPosition;

		return { nextPosition, timesPastZero };
	}
}
