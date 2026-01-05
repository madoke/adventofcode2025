import { BigNumber } from "bignumber.js";
import type { PuzzleInterface } from "../../common/PuzzleInterface.js";
import type { Point } from "../types.js";
import { processLineByLine } from "../../common/input-processing.js";
import { area, parsePoint } from "../utils.js";

enum CornersOrientation {
	TLBR = "TopLeftBottomRight",
	BLTR = "BottomLeftTopRight",
	SameRow = "SameRow",
	SameColumn = "SameColumn",
}

type OppositeCorners =
	| {
			bottomLeft: Point;
			topRight: Point;
			orientationType: CornersOrientation.BLTR;
	  }
	| {
			topLeft: Point;
			bottomRight: Point;
			orientationType: CornersOrientation.TLBR;
	  }
	| {
			topLeft: Point;
			bottomRight: Point;
			orientationType:
				| CornersOrientation.SameColumn
				| CornersOrientation.SameRow;
	  };

export class Day9Puzzle2 implements PuzzleInterface {
	constructor(
		private points: Point[] = [],
		private rows: Map<number, Set<number>> = new Map(),
		private maxRow = 0,
		private maxCol = 0,
	) {}

	private async processLine(line: string): Promise<void> {
		const point = parsePoint(line);
		this.points.push(point);
		let row = this.rows.get(point.y);
		if (!row) {
			row = new Set<number>();
			this.rows.set(point.y, row);
			if (this.maxRow < point.y) {
				this.maxRow = point.y;
			}
		}
		row.add(point.x);
		if (this.maxCol < point.x) {
			this.maxCol = point.x;
		}
	}

	private getOppositeCorners(a: Point, b: Point): OppositeCorners {
		switch (true) {
			case a.x === b.x:
				return {
					topLeft: a.y < b.y ? a : b,
					bottomRight: a.y < b.y ? b : a,
					orientationType: CornersOrientation.SameColumn,
				};

			case a.y === b.y:
				return {
					topLeft: a.x < b.x ? a : b,
					bottomRight: a.x < b.x ? b : a,
					orientationType: CornersOrientation.SameRow,
				};

			case a.x < b.x && a.y > b.y:
				return {
					topLeft: { x: a.x, y: b.y },
					bottomRight: { x: b.x, y: a.y },
					orientationType: CornersOrientation.TLBR,
				};
			case a.x > b.x && a.y < b.y:
				return {
					topLeft: { x: b.x, y: a.y },
					bottomRight: { x: a.x, y: b.y },
					orientationType: CornersOrientation.TLBR,
				};

			case a.x < b.x && a.y < b.y:
				return {
					topRight: { x: b.x, y: a.y },
					bottomLeft: { x: a.x, y: b.y },
					orientationType: CornersOrientation.BLTR,
				};
			case a.x > b.x && a.y > b.y:
				return {
					topRight: { x: a.x, y: b.y },
					bottomLeft: { x: b.x, y: a.y },
					orientationType: CornersOrientation.BLTR,
				};

			default:
				throw new Error("Invalid corners provided !");
		}
	}

	private lookUpRed(
		rowStart: number,
		rowEnd: number,
		colStart: number,
		colEnd: number,
	): boolean {
		for (let i = rowStart; i <= rowEnd; i++) {
			const row = this.rows.get(i);
			if (!row) {
				continue;
			}

			for (let j = colStart; j <= colEnd; j++) {
				if (row.has(j)) {
					return true;
				}
			}
		}

		return false;
	}

	private isInsideMesh(a: Point, b: Point): boolean {
		const corners = this.getOppositeCorners(a, b);

		if (
			[CornersOrientation.SameColumn, CornersOrientation.SameRow].includes(
				corners.orientationType,
			)
		) {
			return true;
		}

		if (corners.orientationType === CornersOrientation.BLTR) {
			return (
				this.lookUpRed(
					corners.bottomLeft.y,
					this.maxRow,
					0,
					corners.bottomLeft.x,
				) && this.lookUpRed(corners.topRight)
			);
		}
	}

	private largestArea(): BigNumber {
		let result = new BigNumber(0);

		for (let i = 0; i < this.points.length - 1; i++) {
			for (let j = i + 1; j < this.points.length; j++) {
				const a = this.points[i];
				const b = this.points[j];
				if (!a || !b) {
					throw new Error("Could not find points");
				}

				const rectarea = area(a, b);
				if (result.lt(rectarea)) {
					result = rectarea;
				}
			}
		}
		return result;
	}

	public async run(inputFilePath: string): Promise<BigNumber> {
		await processLineByLine(inputFilePath, (line) => this.processLine(line));
		return this.largestArea();
	}
}

export default Day9Puzzle2;
