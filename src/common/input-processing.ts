import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export async function processLineByLine(
	pathToFile: string,
	lineCallback: (line: string) => Promise<void>,
): Promise<void> {
	const fileStream = createReadStream(pathToFile);
	fileStream.setEncoding("utf8");
	const lineReader = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	for await (const line of lineReader) {
		await lineCallback(line);
	}
}

export function processByDelimiter(
	pathToFile: string,
	delimiter: string,
	chunkCallback: (chunk: string) => Promise<void>,
): Promise<void> {
	return new Promise((resolve) => {
		const fileStream = createReadStream(pathToFile, { encoding: "utf8" });
		fileStream.on("readable", async () => {
			let chunk = "";
			let buffer = fileStream.read(1);

			while (buffer !== null) {
				const char = buffer.toString();
				if (char === delimiter) {
					await chunkCallback(chunk);
					chunk = "";
				} else {
					chunk += char;
				}
				buffer = fileStream.read(1);
			}
			if (chunk.length > 0) {
				await chunkCallback(chunk);
			}
			resolve();
		});
	});
}
