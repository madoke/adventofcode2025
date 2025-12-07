import { type RollSlot, type RollsGrid } from "./types.js";
import { processLineByLine } from "../common/input-processing.js";

export const buildRollsGrid = async (
	inputFilePath: string,
): Promise<RollsGrid> => {
	const rollsGrid: RollsGrid = [];

	const onInputLine = async (line: string): Promise<void> => {
		const row: RollSlot[] = [];
		for (let col = 0; col < line.length; col++) {
			const char = line[col];
			const slot = char as RollSlot;
			row.push(slot);
		}
		rollsGrid.push(row);
	};

	await processLineByLine(inputFilePath, onInputLine);

	return rollsGrid;
};
