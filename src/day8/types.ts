export type Point = {
	x: number;
	y: number;
    z: number;
};

export type Connection = {
	a: Point;
	b: Point;
	distance: BigNumber;
};