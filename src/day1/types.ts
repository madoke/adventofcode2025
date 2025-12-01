export enum Direction {
	Left = "L",
	Right = "R",
}

export type Instruction = {
	direction: Direction;
	distance: number;
};

export type DialState = {
	position: number;
};
