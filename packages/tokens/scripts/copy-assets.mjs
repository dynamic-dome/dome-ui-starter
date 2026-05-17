import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const sourceDir = resolve(packageRoot, "src");
const targetDir = resolve(packageRoot, "dist");

await mkdir(targetDir, { recursive: true });

for (const fileName of await readdir(sourceDir)) {
  if (fileName.endsWith(".css")) {
    await copyFile(resolve(sourceDir, fileName), resolve(targetDir, fileName));
  }
}
