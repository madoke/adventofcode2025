import { program } from "commander";
import { Day1Puzzle1 } from "./day1/puzzle1/index.js";
import { Day1Puzzle2 } from "./day1/puzzle2/index.js";
import { Day2Puzzle1 } from "./day2/puzzle1/index.js";
import { Day2Puzzle2 } from "./day2/puzzle2/index.js";
import Day3Puzzle1 from "./day3/puzzle1/index.js";
import Day3Puzzle2 from "./day3/puzzle2/index.js";

program
	.requiredOption("--day <number>", "Specify the day to run")
	.requiredOption("--puzzle <number>", "Specify the puzzle to run")
	.argument("<string>");

program.parse();

const day = program.opts().day;
const puzzleNumber = program.opts().puzzle;
const inputFileName = program.args[0];

if (!day) {
	console.error("Day is required");
	process.exit(1);
}

if (!puzzleNumber) {
	console.error("Puzzle number is required");
	process.exit(1);
}

if (!inputFileName) {
	console.error("Input file name is required");
	process.exit(1);
}

const puzzles = [
	[new Day1Puzzle1(), new Day1Puzzle2()],
	[new Day2Puzzle1(), new Day2Puzzle2()],
	[new Day3Puzzle1(), new Day3Puzzle2()],
];
const puzzle = puzzles[day - 1]?.[puzzleNumber - 1];

if (!puzzle) {
	console.error("Invalid day or puzzle number");
	process.exit(1);
}

await puzzle.run(inputFileName);
