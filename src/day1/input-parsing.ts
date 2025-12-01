import { Direction, type Instruction } from "./types.js";

const INSTRUCTION_REGEX = /^(?<direction>L|R)(?<distance>[0-9]+)$/;

export const parseInstruction = (line: string): Instruction => {
	const match = INSTRUCTION_REGEX.exec(line);
	if (!match || !match.groups) {
		throw new Error(`Invalid instruction: ${line}`);
	}
	const directionStr = match.groups["direction"];
	const distanceStr = match.groups["distance"];

	if (!directionStr || !distanceStr) {
		throw new Error(`Invalid instruction groups: ${line}`);
	}

	const direction = directionStr === "L" ? Direction.Left : Direction.Right;
	const distance = parseInt(distanceStr, 10);

	return { direction, distance };
};
