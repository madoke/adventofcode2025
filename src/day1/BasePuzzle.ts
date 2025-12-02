import { Direction, type DialState, type Instruction } from "./types.js";

export abstract class BasePuzzle {
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
		const initialPosition = this.dialState.position;

		if (nextPosition === 0) {
			timesPastZero += 1;
		} else if (nextPosition > 99) {
			const quotient = Math.floor(nextPosition / 100);
			timesPastZero += quotient;
			nextPosition = nextPosition % 100;
		} else if (nextPosition < 0) {
			const quotient = Math.floor(nextPosition / -100);
			if (initialPosition === 0) {
				timesPastZero += quotient;
			} else {
				timesPastZero += 1 + quotient;
			}
			nextPosition = 100 + (nextPosition % 100);
		}

		this.dialState.position = nextPosition;

		return { nextPosition, timesPastZero };
	}
}
