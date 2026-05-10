import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const from = resolve(packageRoot, "src/styles.css");
const to = resolve(packageRoot, "dist/styles.css");

await mkdir(dirname(to), { recursive: true });
await copyFile(from, to);
