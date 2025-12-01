import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export async function processLineByLine(
	pathToFile: string,
	lineCallback: (line: string) => Promise<void>,
): Promise<void> {
	const fileStream = createReadStream(pathToFile);
	const lineReader = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	for await (const line of lineReader) {
		await lineCallback(line);
	}
}
