import { join } from "path";
import { program } from "commander";
import Day1Puzzle1 from "./day1/puzzle1/index.js";
import Day1Puzzle2 from "./day1/puzzle2/index.js";
import Day2Puzzle1 from "./day2/puzzle1/index.js";
import Day2Puzzle2 from "./day2/puzzle2/index.js";
import Day3Puzzle1 from "./day3/puzzle1/index.js";
import Day3Puzzle2 from "./day3/puzzle2/index.js";
import Day4Puzzle2 from "./day4/puzzle2/index.js";
import Day4Puzzle1 from "./day4/puzzle1/index.js";
import Day5Puzzle1 from "./day5/puzzle1/index.js";
import Day5Puzzle2 from "./day5/puzzle2/index.js";
import Day6Puzzle1 from "./day6/puzzle1/index.js";
import Day6Puzzle2 from "./day6/puzzle2/index.js";
import Day7Puzzle1 from "./day7/puzzle1/index.js";
import Day7Puzzle2 from "./day7/puzzle2/index.js";
import Day8Puzzle2 from "./day8/puzzle2/index.js";
import Day8Puzzle1 from "./day8/puzzle1/index.js";
import Day9Puzzle1 from "./day9/puzzle1/index.js";
import Day9Puzzle2 from "./day9/puzzle2/index.js";

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
	[new Day4Puzzle1(), new Day4Puzzle2()],
	[new Day5Puzzle1(), new Day5Puzzle2()],
	[new Day6Puzzle1(), new Day6Puzzle2()],
	[new Day7Puzzle1(), new Day7Puzzle2()],
	[new Day8Puzzle1(), new Day8Puzzle2()],
	[new Day9Puzzle1(), new Day9Puzzle2()],
];
const puzzle = puzzles[day - 1]?.[puzzleNumber - 1];

if (!puzzle) {
	console.error("Invalid day or puzzle number");
	process.exit(1);
}
console.log(
	`Running Day ${day} Puzzle ${puzzleNumber} with input file: ${inputFileName}`,
);
const inputFilePath = join(process.cwd(), `src/day${day}/input`, inputFileName);
const result = await puzzle.run(inputFilePath);
console.log(`Result: ${result.toString()}`);
