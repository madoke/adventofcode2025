import { RollSlot, type RollsGrid } from "./types.js";

export const isRollAtSlot = (
	rollsGrid: RollsGrid,
	rowIndex: number,
	colIndex: number,
): boolean => {
	if (rowIndex < 0 || rowIndex >= rollsGrid.length) {
		return false;
	}

	const row = rollsGrid[rowIndex];

	if (!row) {
		return false;
	}

	if (colIndex < 0 || colIndex >= row.length) {
		return false;
	}

	const roll = row[colIndex];

	return roll !== RollSlot.Empty;
};

export const isRollAccessible = (
	rollsGrid: RollsGrid,
	rowIndex: number,
	colIndex: number,
): boolean => {
	let surroundingRollsCount = 0;
	for (let r = -1; r <= 1; r++) {
		for (let c = -1; c <= 1; c++) {
			if (r === 0 && c === 0) {
				continue; // Skip the current slot
			}
			if (isRollAtSlot(rollsGrid, rowIndex + r, colIndex + c)) {
				surroundingRollsCount++;
				if (surroundingRollsCount >= 4) {
					return false;
				}
			}
		}
	}
	return surroundingRollsCount < 4;
};

export const removeAccessibleRolls = (rollsGrid: RollsGrid): void => {
	for (let rowIndex = 0; rowIndex < rollsGrid.length; rowIndex++) {
		const row = rollsGrid[rowIndex];
		if (!row) {
			continue;
		}
		for (let colIndex = 0; colIndex < row.length; colIndex++) {
			if (row[colIndex] === RollSlot.Accessible) {
				row[colIndex] = RollSlot.Empty;
			}
		}
	}
};
