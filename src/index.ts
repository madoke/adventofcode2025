import { Puzzle1 } from "./day1/puzzle1/index.js";
import { Puzzle2 } from "./day1/puzzle2/index.js";

new Puzzle1().run("input.txt").then(() => {
	console.log("Done");
});
new Puzzle2().run("input.test.txt").then(() => {
	console.log("Done");
});
new Puzzle2().run("input.test1.txt").then(() => {
	console.log("Done");
});
new Puzzle2().run("input.txt").then(() => {
	console.log("Done");
});
