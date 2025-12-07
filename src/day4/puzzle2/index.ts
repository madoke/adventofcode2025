import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import { BigNumber } from "bignumber.js";
import { buildRollsGrid } from "../input-parsing.js";
import { printRollsGrid } from "../output-printing.js";
import { isRollAccessible, removeAccessibleRolls } from "../utils.js";
import { RollSlot, type RollsGrid } from "../types.js";

export class Day4Puzzle2 implements PuzzleInterface {
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
				if (isRollAccessible(rollsGrid, rowIndex, colIndex)) {
					accessibleRollsCount++;
					row[colIndex] = RollSlot.Accessible;
				}
			}
		}

		return accessibleRollsCount;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		const rollsGrid = await buildRollsGrid(inputFilePath);
		let totalCount = new BigNumber(0);
		let stepCount: number;
		do {
			stepCount = this.countAccessibleRolls(rollsGrid);
			totalCount = totalCount.plus(stepCount);
			removeAccessibleRolls(rollsGrid);
		} while (stepCount > 0);
		printRollsGrid(rollsGrid);
		return totalCount;
	}
}

export default Day4Puzzle2;
