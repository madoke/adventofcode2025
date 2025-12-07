import { join } from "path";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { buildRollsGrid } from "../input-parsing.js";
import { printRollsGrid } from "../output-printing.js";
import { RollSlot, type RollsGrid } from "../types.js";

export class Day4Puzzle1 implements PuzzleInterface {
	private isRollAtSlot(
		rollsGrid: RollsGrid,
		rowIndex: number,
		colIndex: number,
	): boolean {
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
	}

	private isRollAccessible(
		rollsGrid: RollsGrid,
		rowIndex: number,
		colIndex: number,
	): boolean {
		let surroundingRollsCount = 0;
		for (let r = -1; r <= 1; r++) {
			for (let c = -1; c <= 1; c++) {
				if (r === 0 && c === 0) {
					continue; // Skip the current slot
				}
				if (this.isRollAtSlot(rollsGrid, rowIndex + r, colIndex + c)) {
					surroundingRollsCount++;
					if (surroundingRollsCount >= 4) {
						return false;
					}
				}
			}
		}
		return surroundingRollsCount < 4;
	}

	private countAccessibleRolls(rollsGrid: RollsGrid): number {
		let accessibleRollsCount = 0;

		for (let rowIndex = 0; rowIndex < rollsGrid.length; rowIndex++) {
			const row = rollsGrid[rowIndex];
			if (!row) {
				continue;
			}
			for (let colIndex = 0; colIndex < row.length; colIndex++) {
				// Skip empty slots
				if (row[colIndex] === RollSlot.Empty) {
					continue;
				}
				// Check if the roll is accessible
				if (this.isRollAccessible(rollsGrid, rowIndex, colIndex)) {
					accessibleRollsCount++;
					row[colIndex] = RollSlot.Accessible;
				}
			}
		}

		return accessibleRollsCount;
	}

	public async run(inputFileName: string): Promise<void> {
		// Implementation for Day 3 Puzzle 1
		console.log(`Running Day 4 Puzzle 1 with input file: ${inputFileName}`);
		const filePath = join(process.cwd(), "src/day4/input", inputFileName);

		const rollsGrid = await buildRollsGrid(filePath);
		const accessibleRollsCount = this.countAccessibleRolls(rollsGrid);
		printRollsGrid(rollsGrid);
		console.log(`Number of accessible rolls: ${accessibleRollsCount}`);
	}
}

export default Day4Puzzle1;
