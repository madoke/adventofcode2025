import { program } from "commander";
import { Puzzle1 } from "./day1/puzzle1/index.js";
import { Puzzle2 } from "./day1/puzzle2/index.js";

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

const puzzles = [[new Puzzle1(), new Puzzle2()]];
const puzzle = puzzles[day - 1]?.[puzzleNumber - 1];

if (!puzzle) {
	console.error("Invalid day or puzzle number");
	process.exit(1);
}

await puzzle.run(inputFileName);
