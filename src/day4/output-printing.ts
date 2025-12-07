import type { RollsGrid, RollSlot } from "./types.js";

export const printRollsGrid = (grid: RollsGrid): void => {
	for (const row of grid) {
		const rowString = row.map((slot: RollSlot) => slot).join("");
		console.log(rowString);
	}
};
